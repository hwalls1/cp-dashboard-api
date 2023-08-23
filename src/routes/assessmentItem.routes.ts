import express from 'express';
import {
  createAssessmentItemHandler,
  findAssessmentItemHandler,
  getAllAssessmentItemsHandler,
} from '../controllers/assessmentItem.controller';

const router = express.Router();

router.post('/api/assessmentItems', createAssessmentItemHandler);
router.get('/api/assessmentItems/:id', findAssessmentItemHandler);
router.get('/api/assessmentItems', getAllAssessmentItemsHandler);

export default router;
