import express from 'express';
import {
    createAssessmentResponseHandler,
    deleteAssessmentResponseHandler,
    getAllAssessmentResponsesHandler, 
    getOneAssessmentResponseHandler,
    updateAssessmentResponseHandler,
} from '../controllers/assessmentResponse.controller';

const router = express.Router();

router.get('/api/assessmentResponses', getAllAssessmentResponsesHandler);

router.get('/api/assessmentResponses/:id', getOneAssessmentResponseHandler);

router.post('/api/assessmentResponses', createAssessmentResponseHandler);

router.post('/api/assessmentResponses/:id', updateAssessmentResponseHandler);

router.delete('/api/assessmentResponses/:id', deleteAssessmentResponseHandler);

export default router;