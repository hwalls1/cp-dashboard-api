import express from 'express';
import {
  getAllExercisesHandler,
  getOneExerciseHandler,
  createExerciseHandler,
  updateExerciseHandler,
  deleteExerciseHandler,
} from '../controllers/exercise.controller';

const router = express.Router();

router.get('/api/exercises', getAllExercisesHandler);
router.get('/api/exercises/:id', getOneExerciseHandler);
router.post('/api/exercises', createExerciseHandler);
router.put('/api/exercises/:id', updateExerciseHandler);
router.delete('/api/exercises/:id', deleteExerciseHandler);

export default router;
