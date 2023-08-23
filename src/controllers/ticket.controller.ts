import { NextFunction, Request, Response } from 'express';
import {
  getAllTickets,
  getOneTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../services/ticket.service';
import log from '../utils/logger';
import createAppError, { HttpCode } from '../utils/appError';

interface CreateTicketInput {
  subject: string;
  sender: number;
  recipient: number;
  body: string;
}

export async function getAllTicketsHandler(req: Request, res: Response) {
  const tickets = await getAllTickets(
    req.query.senderId,
    req.query.recipientId
  );

  return res.send(tickets);
}

export async function getOneTicketHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  const ticket = await getOneTicket(id);

  return res.send(ticket);
}

export async function createTicketHandler(
  req: Request<object, object, CreateTicketInput>,
  res: Response
) {
  const body = req.body;

  try {
    await createTicket(body);
    return res.send('Ticket created successfully');
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Ticket already exists',
    });
  }
}

export async function updateTicketHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const id = Number(req.params.id);

  try {
    await updateTicket(body, id);
    log.info(`Ticket:${id} updated successfully`);
    res.send('Ticket updated successfully');
  } catch (errors) {
    log.error(`Could not update ticket id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not update the ticket')
    );
  }
}

export async function deleteTicketHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  try {
    await deleteTicket(id);
    log.info('Ticket deleted successfully');
    return res.send('Ticket deleted successfully');
  } catch (errors) {
    log.error(`Could not delete ticket id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not delete the ticket')
    );
  }
}
