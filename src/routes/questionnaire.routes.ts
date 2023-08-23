import express from 'express';
import {
  getAllQuestionnairesHandler,
  getOneQuestionnaireHandler,
  createQuestionnaireHandler,
  updateQuestionnaireHandler,
  deleteQuestionnaireHandler,
} from '../controllers/questionnaire.controller';

const router = express.Router();

router.get('/api/questionnaires', getAllQuestionnairesHandler);
router.get('/api/questionnaires/:id', getOneQuestionnaireHandler);
router.post('/api/questionnaires', createQuestionnaireHandler);
router.post('/api/questionnaires/:id', updateQuestionnaireHandler);
router.delete('/api/questionnaires/:id', deleteQuestionnaireHandler);

export default router;
