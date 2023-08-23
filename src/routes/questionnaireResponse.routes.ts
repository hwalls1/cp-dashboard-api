import express from 'express';
import {
  getAllQuestionnaireResponsesHandler,
  getOneQuestionnaireResponseHandler,
  createQuestionnaireResponseHandler,
  updateQuestionnaireResponseHandler,
  deleteQuestionnaireResponseHandler,
} from '../controllers/questionnaireResponse.controller';

const router = express.Router();

router.get('/api/questionnaireResponses', getAllQuestionnaireResponsesHandler);
router.get(
  '/api/questionnaireResponses/:id',
  getOneQuestionnaireResponseHandler
);
router.post('/api/questionnaireResponses', createQuestionnaireResponseHandler);
router.put(
  '/api/questionnaireResponses/:id',
  updateQuestionnaireResponseHandler
);
router.delete(
  '/api/questionnaireResponses/:id',
  deleteQuestionnaireResponseHandler
);

export default router;
