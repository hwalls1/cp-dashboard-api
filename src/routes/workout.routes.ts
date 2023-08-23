import express from 'express';
import {
  createWorkoutHandler,
  deleteWorkoutHandler,
  findWorkoutHandler,
  getAllWorkoutsHandler,
  updateWorkoutHandler,
} from '../controllers/workout.controller';

const router = express.Router();

router.post('/api/workouts/', createWorkoutHandler);
router.get('/api/workouts/:id', findWorkoutHandler);
router.get('/api/workouts', getAllWorkoutsHandler);
router.post('/api/workouts/:id', updateWorkoutHandler);
router.delete('/api/workouts/:id', deleteWorkoutHandler);

export default router;
