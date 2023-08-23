import express from 'express';
import {
  getAllMessagesHandler,
  getOneMessageHandler,
  createMessageHandler,
  updateMessageHandler,
  deleteMessageHandler,
} from '../controllers/message.controller';

const router = express.Router();

router.get('/api/messages', getAllMessagesHandler);
router.get('/api/messages/:id', getOneMessageHandler);
router.post('/api/messages', createMessageHandler);
router.post('/api/messages/:id', updateMessageHandler);
router.delete('/api/messages/:id', deleteMessageHandler);

export default router;
