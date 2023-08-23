import AppDataSource from '../utils/connectToDb';
import { Ticket } from '../entities/ticket.entity';
import log from '../utils/logger';

const ticketRepository = AppDataSource.getRepository(Ticket);

export const getAllTickets = async (sender: any, recipient: any) => {
  const tickets =
    AppDataSource.getRepository(Ticket).createQueryBuilder('tickets');

  if (sender) {
    tickets.andWhere('tickets.sender = :sender', { sender: sender });
  }

  if (recipient) {
    tickets.andWhere('tickets.recipient = :recipient', {
      recipient: recipient,
    });
  }

  return await tickets.getMany();
};

export const getOneTicket = async (id: number) => {
  try {
    const ticket = ticketRepository.findOneOrFail({
      where: {
        id: id,
      },
      select: {
        subject: true,
        body: true,
        sender: true,
        recipient: true,
      },
      order: {},
    });
    log.info(`Found Ticket ${id}`);

    return ticket;
  } catch (error) {
    return error;
  }
};

export const createTicket = async (input: Partial<Ticket>) => {
  return ticketRepository.save(ticketRepository.create(input));
};

export const updateTicket = async (input: Partial<Ticket>, id: number) => {
  const { subject, sender, recipient, body } = input;

  const ticket = await ticketRepository.findOneOrFail({
    where: {
      id: Number(id),
    },
  });

  ticket.subject = subject as string;
  ticket.sender = sender as number;
  ticket.recipient = recipient as number;
  ticket.body = body as string;

  await ticketRepository.save(ticket);
};

export const deleteTicket = async (id: number) => {
  await ticketRepository.delete(id);
};
