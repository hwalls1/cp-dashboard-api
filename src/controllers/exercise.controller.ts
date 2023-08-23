import { NextFunction, Request, Response } from 'express';
import log from '../utils/logger';
import {
  createExercise,
  deleteExercise,
  getAllExercises,
  getOneExercise,
  updateExercise,
} from '../services/exercise.service';
import createAppError, { HttpCode } from '../utils/appError';

export async function getAllExercisesHandler(_req: Request, res: Response) {
  const exercises = await getAllExercises();

  return res.send(exercises);
}

export async function getOneExerciseHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  const exercise = await getOneExercise(id);

  return res.send(exercise);
}

export async function createExerciseHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  try {
    const exercise = await createExercise(body);

    return res.send({
      message: 'Exercise created successfully',
      exercise: exercise,
    });
  } catch (err: any) {
    log.error(`Exercise already exists`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not create the exercise')
    );
  }
}

export async function updateExerciseHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const id = Number(req.params.id);

  try {
    await updateExercise(body, id);
    log.info(`Exercise:${id} updated successfully`);
    res.send('Exercise updated successfully');
  } catch (err: any) {
    log.error(`Could not update exercise id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not update the exercise')
    );
  }
}

export async function deleteExerciseHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  try {
    await deleteExercise(id);
    log.info(`Exercise:${id} deleted successfuly`);
    return res.send('Exercise deleted successfully');
  } catch (error) {
    log.error(`Could not delete the exercise id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not delete the exercise')
    );
  }
}
