import { NextFunction, Request, Response } from 'express';
import log from '../utils/logger';
import {
  createWorkout,
  findWorkout,
  getAllWorkouts,
  updateWorkout,
  deleteWorkout,
} from '../services/workout.service';
import createAppError, { HttpCode } from '../utils/appError';

export async function createWorkoutHandler(req: Request, res: Response) {
  const body = req.body;
  try {
    const workout = await createWorkout(body);

    return res.send({
      message: 'Workout successfully created',
      workout: workout,
    });
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Workout already exists',
    });
  }
}

export async function findWorkoutHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  log.info(`${id}`);
  try {
    const Workout = await findWorkout(id);

    return res.send(Workout);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Workout not found',
    });
  }
}

export async function getAllWorkoutsHandler(req: Request, res: Response) {
  try {
    const query = req.query;

    const workouts = await getAllWorkouts(query);
    return res.send(workouts);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Could not retrieve Workouts',
    });
  }
}

export async function updateWorkoutHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const id = Number(req.params.id);

  try {
    await updateWorkout(body, id);
    log.info(`Workout:${id} updated successfully`);
    res.send('Workout updated successfully');
  } catch (err: any) {
    log.error(`Could not update workout id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not update the workout')
    );
  }
}

export async function deleteWorkoutHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  try {
    await deleteWorkout(id);
    log.info(`Workout:${id} deleted successfully`);
    return res.send('Workout deleted successfully');
  } catch (err: any) {
    log.error(`Could not delete workout id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not delete the workout')
    );
  }
}
