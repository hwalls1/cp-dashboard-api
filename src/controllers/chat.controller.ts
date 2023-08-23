import { NextFunction, Request, Response } from 'express';
import {
  getAllChats,
  getOneChat,
  createChat,
  updateChat,
  deleteChat,
} from '../services/chat.service';
import log from '../utils/logger';
import createAppError, { HttpCode } from '../utils/appError';

interface CreateChatInput {
  subject: string;
  sender: number;
  recipient: number;
  body: string;
}

export async function getAllChatsHandler(req: Request, res: Response) {
  const Chats = await getAllChats([req.query.userId]);

  return res.send(Chats);
}

export async function getOneChatHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  const Chat = await getOneChat(id);

  return res.send(Chat);
}

export async function createChatHandler(
  req: Request,
  res: Response
) {
  const body = req.body;

  try {
    const chat = await createChat(body);
    return res.send({
      message: 'Chat created successfully',
      chat: chat
    });
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      Chat: 'Chat already exists',
    });
  }
}

export async function updateChatHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const id = Number(req.params.id);

  try {
    const chat = await updateChat(body, id);
    log.info(`Chat:${id} updated successfully`);
    res.send({
        message: 'Chat updated successfully',
        chat: chat
    });
  } catch (errors) {
    log.error(`Could not update Chat id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not update the Chat')
    );
  }
}

export async function deleteChatHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  try {
    await deleteChat(id);
    log.info('Chat deleted successfully');
    return res.send('Chat deleted successfully');
  } catch (errors) {
    log.error(`Could not delete Chat id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not delete the Chat')
    );
  }
}
