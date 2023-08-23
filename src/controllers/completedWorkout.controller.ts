import { Request, Response } from 'express';
import {
  createCompletedWorkout,
  findCompletedWorkout,
  getAllCompletedWorkouts,
  updateCompletedWorkout,
} from '../services/completedWorkout.service';

export async function createCompletedWorkoutHandler(
  req: Request,
  res: Response
) {
  const body = req.body;
  try {
    const completedWorkout = await createCompletedWorkout(body);

    return res.send({
      message: 'Completed workout successfully created',
      completedWorkout,
    });
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Could not create completed workout',
      error: err,
    });
  }
}

export async function updateCompletedWorkoutHandler(
  req: Request,
  res: Response
) {
  const body = req.body;
  try {
    await updateCompletedWorkout(body);
    return res.send('Completed workout successfully updated');
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Completed workout not updated',
    });
  }
}

export async function findCompletedWorkoutHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const completedWorkout = await findCompletedWorkout(id);

    return res.send(completedWorkout);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Completed workout not found',
    });
  }
}

export async function getAllCompletedWorkoutsHandler(
  _req: Request,
  res: Response
) {
  const query = _req.query;

  try {
    const completedWorkout = await getAllCompletedWorkouts(query);

    return res.send(completedWorkout);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Could not retrieve completed workouts',
    });
  }
}
