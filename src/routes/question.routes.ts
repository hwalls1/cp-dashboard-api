import express from 'express';
import {
  createQuestionHandler,
  findQuestionHandler,
} from '../controllers/question.controller';

const router = express.Router();

router.post('/api/question/', createQuestionHandler);
router.get('/api/question/:id', findQuestionHandler);

export default router;
