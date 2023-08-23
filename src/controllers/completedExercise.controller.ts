import { Request, Response } from 'express';
import {
  createCompletedExercise,
  findCompletedExercise,
  getAllCompletedExercises,
  updateCompletedExercise,
} from '../services/completedExercise.service';

export async function createCompletedExerciseHandler(
  req: Request,
  res: Response
) {
  const body = req.body;
  try {
    const completedExercise = await createCompletedExercise(body);

    return res.send({
      message: 'Completed Exercise successfully created',
      completedExercise,
    });
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Could not create completed Exercise',
      error: err,
    });
  }
}

export async function updateCompletedExerciseHandler(
  req: Request,
  res: Response
) {
  const body = req.body;
  try {
    await updateCompletedExercise(body);
    return res.send('Completed Exercise successfully updated');
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Completed Exercise not updated',
    });
  }
}

export async function findCompletedExerciseHandler(
  req: Request,
  res: Response
) {
  const { id } = req.body;

  try {
    const completedExercise = await findCompletedExercise(id);

    return res.send(completedExercise);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Completed Exercise not found',
    });
  }
}

export async function getAllCompletedExercisesHandler(
  req: Request,
  res: Response
) {
  const query = req.query;

  try {
    const completedExercise = await getAllCompletedExercises(query);

    return res.send(completedExercise);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Could not retrieve completed Exercises',
      error: err,
    });
  }
}
