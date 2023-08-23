import { NextFunction, Request, Response } from 'express';
import {
  createAthleteSchedule,
  updateAthleteSchedule,
  findAthleteScheduleByAthlete,
  getAllAthleteSchedules,
} from '../services/athleteSchedule.service';

export async function createAthleteScheduleHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const athleteSchedule = req.body;
  athleteSchedule.workouts = JSON.stringify(athleteSchedule.workouts);

  try {
    await createAthleteSchedule(athleteSchedule);
    return res.send('Schedule successfully created');
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Failed to create schedule for that user',
      });
    }
    next(err);
  }
}

export async function updateAthleteScheduleHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const athleteSchedule = req.body;
  athleteSchedule.workouts = JSON.stringify(athleteSchedule.workouts);

  try {
    await updateAthleteSchedule(athleteSchedule);
    return res.send({
      message: 'Schedule successfully updated',
      schedule: athleteSchedule,
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Failed to update schedule for that user',
      });
    }
    next(err);
  }
}

export async function findAthleteScheduleByAthleteHandler(
  req: Request,
  res: Response
) {
  const athleteId = Number(req.params.athleteId);

  try {
    const athleteSchedule = await findAthleteScheduleByAthlete(athleteId);
    return res.send(athleteSchedule);
  } catch (err) {
    return res.status(404).send(`Could not find ${athleteId}`);
  }
}

export async function getAllAthleteSchedulesHandler(
  _req: Request,
  res: Response
) {
  try {
    const athleteSchedules = await getAllAthleteSchedules();

    return res.send(athleteSchedules);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Could not retrieve athlete schedules',
    });
  }
}
