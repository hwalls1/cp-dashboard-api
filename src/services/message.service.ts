import AppDataSource from '../utils/connectToDb';
import { Message } from '../entities/message.entity';
import log from '../utils/logger';
import { User } from '../entities/user.entity';

const MessageRepository = AppDataSource.getRepository(Message);

export const getAllMessages = async (sender: any, recipient: any) => {
  const Messages =
    AppDataSource.getRepository(Message).createQueryBuilder('messages');

  if (sender) {
    Messages.andWhere('messages.sender = :sender', { sender: sender });
  }

  if (sender) {
    Messages.andWhere('messages.recipient = :recipient', { recipient: recipient });
  }

  return await Messages.getMany();
};

export const getOneMessage = async (id: number) => {
  try {
    const Message = MessageRepository.findOneOrFail({
      where: {
        id: id,
      },
      select: {
        body: true,
      },
      relations: {
        sender: true,
        recipient: true,
      },
    });
    log.info(`Found Message ${id}`);

    return Message;
  } catch (error) {
    return error;
  }
};

export const createMessage = async (input: Partial<Message>) => {
  return MessageRepository.save(MessageRepository.create(input));
};

export const updateMessage = async (input: Partial<Message>, id: number) => {
  const {  sender, recipient, body } = input;

  const Message = await MessageRepository.findOneOrFail({
    where: {
      id: Number(id),
    },
  });

  Message.sender = sender as User;
  Message.recipient = recipient as User;
  Message.body = body as string;

  await MessageRepository.save(Message);
};

export const deleteMessage = async (id: number) => {
  await MessageRepository.delete(id);
};
