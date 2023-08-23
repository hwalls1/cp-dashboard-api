import express from 'express';
import {
  getAllChatsHandler,
  getOneChatHandler,
  createChatHandler,
  updateChatHandler,
  deleteChatHandler,
} from '../controllers/chat.controller';

const router = express.Router();

router.get('/api/chats', getAllChatsHandler);
router.get('/api/chats/:id', getOneChatHandler);
router.post('/api/chats', createChatHandler);
router.post('/api/chats/:id', updateChatHandler);
router.delete('/api/chats/:id', deleteChatHandler);

export default router;
