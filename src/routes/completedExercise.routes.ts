import express from 'express';
import {
  createCompletedExerciseHandler,
  updateCompletedExerciseHandler,
  findCompletedExerciseHandler,
  getAllCompletedExercisesHandler,
} from '../controllers/completedExercise.controller';

const router = express.Router();

router.post('/api/completedExercises/', createCompletedExerciseHandler);
router.post('/api/completedExercises/:id/', updateCompletedExerciseHandler);
router.get('/api/completedExercises/:id', findCompletedExerciseHandler);
router.get('/api/completedExercises', getAllCompletedExercisesHandler);

export default router;
