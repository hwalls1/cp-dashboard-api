import express from 'express';
import {
  createAthleteScheduleHandler,
  updateAthleteScheduleHandler,
  findAthleteScheduleByAthleteHandler,
  getAllAthleteSchedulesHandler,
} from '../controllers/athleteSchedule.controller';

const router = express.Router();

router.post('/api/athleteSchedules/:athleteId/', createAthleteScheduleHandler);
router.post(
  '/api/athleteSchedules/:athleteId/:id',
  updateAthleteScheduleHandler
);
router.get(
  '/api/athleteSchedules/:athleteId',
  findAthleteScheduleByAthleteHandler
);
router.get('/api/athleteSchedules', getAllAthleteSchedulesHandler);

export default router;
