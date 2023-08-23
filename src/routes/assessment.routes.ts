import express from 'express';
import {
  createAssessmentHandler,
  findAssessmentHandler,
  getAllAssessmentsHandler,
  updateAssessmentHandler
} from '../controllers/assessment.controller';

const router = express.Router();

router.post('/api/assessments/', createAssessmentHandler);
router.post('/api/assessments/:id', updateAssessmentHandler);
router.get('/api/assessments/:id', findAssessmentHandler);
router.get('/api/assessments', getAllAssessmentsHandler);

export default router;
