import AppDataSource from '../utils/connectToDb';
import { Chat } from '../entities/chat.entity';
import log from '../utils/logger';
import { User } from '../entities/user.entity';
import { Message } from '../entities/message.entity';

const ChatRepository = AppDataSource.getRepository(Chat);

export const getAllChats = async (users: any) => {
  const Chats =
    AppDataSource.getRepository(Chat).createQueryBuilder('chats');

    if (users) {
        Chats.leftJoinAndSelect('chats.users', 'user')
        Chats.where('user.id IN (:...users)', { users })
        Chats.leftJoinAndSelect('user.profilePicture', 'profilePicture')

    }

    Chats.leftJoinAndSelect('chats.messages', 'message')
        .leftJoinAndSelect('chats.users', 'users');

    return await Chats.getMany();
};

export const getOneChat = async (id: number) => {
  try {
    const Chat = ChatRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: ['users', 'users.profilePicture', 'messages', 'messages.sender', 'messages.recipient'],
    });
    log.info(`Found Chat ${id}`);

    return Chat;
  } catch (error) {
    return error;
  }
};

export const createChat = async (input: Partial<Chat>) => {
  return ChatRepository.save(ChatRepository.create(input));
};

export const updateChat = async (input: Partial<Chat>, id: number) => {
  const {  users, messages } = input;

  const Chat = await ChatRepository.findOneOrFail({
    where: {
      id: Number(id),
    },
  });

  Chat.users = users as User[];
  Chat.messages = messages as Message[];

  return await ChatRepository.save(Chat);
};

export const deleteChat = async (id: number) => {
  await ChatRepository.delete(id);
};
