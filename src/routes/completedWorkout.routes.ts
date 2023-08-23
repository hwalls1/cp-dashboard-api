import express from 'express';
import {
  createCompletedWorkoutHandler,
  updateCompletedWorkoutHandler,
  findCompletedWorkoutHandler,
  getAllCompletedWorkoutsHandler,
} from '../controllers/completedWorkout.controller';

const router = express.Router();

router.post('/api/completedWorkouts/', createCompletedWorkoutHandler);
router.post('/api/completedWorkouts/:id/', updateCompletedWorkoutHandler);
router.get('/api/completedWorkouts/:id', findCompletedWorkoutHandler);
router.get('/api/completedWorkouts', getAllCompletedWorkoutsHandler);

export default router;
