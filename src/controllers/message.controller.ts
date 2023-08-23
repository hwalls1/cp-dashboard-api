import { NextFunction, Request, Response } from 'express';
import {
  getAllMessages,
  getOneMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../services/message.service';
import log from '../utils/logger';
import createAppError, { HttpCode } from '../utils/appError';

interface CreateMessageInput {
  subject: string;
  sender: number;
  recipient: number;
  body: string;
}

export async function getAllMessagesHandler(req: Request, res: Response) {
  const Messages = await getAllMessages(
    req.query.senderId,
    req.query.recipientId
  );

  return res.send(Messages);
}

export async function getOneMessageHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  const Message = await getOneMessage(id);

  return res.send(Message);
}

export async function createMessageHandler(
  req: Request,
  res: Response
) {
  const body = req.body;

  try {
    await createMessage(body);
    return res.send('Message created successfully');
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Message already exists',
    });
  }
}

export async function updateMessageHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const id = Number(req.params.id);

  try {
    await updateMessage(body, id);
    log.info(`Message:${id} updated successfully`);
    res.send('Message updated successfully');
  } catch (errors) {
    log.error(`Could not update Message id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not update the Message')
    );
  }
}

export async function deleteMessageHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  try {
    await deleteMessage(id);
    log.info('Message deleted successfully');
    return res.send('Message deleted successfully');
  } catch (errors) {
    log.error(`Could not delete Message id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not delete the Message')
    );
  }
}
