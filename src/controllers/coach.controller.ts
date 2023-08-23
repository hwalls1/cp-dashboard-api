import { NextFunction, Request, Response } from 'express';
import {
  createCoach,
  findCoach,
  getAllCoaches,
  updateCoach
} from '../services/coach.service';
import log from '../utils/logger';
import createAppError, { HttpCode } from '../utils/appError';

export async function createCoachHandler(req: Request, res: Response) {
  const body = req.body;
  try {
    const coach = await createCoach(body);

    return res.send({
      message: 'Coach successfully created',
      coach: coach 
    });
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Coach already exists',
    });
  }
}

export async function findCoachHandler(req: Request, res: Response) {
  const { id } = req.body;

  try {
    const coach = await findCoach(id);

    return res.send(coach);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Coach not found',
    });
  }
}

export async function getAllCoachesHandler(_req: Request, res: Response) {
  const query = _req.query;

  try {
    const coaches = await getAllCoaches( query );

    return res.send(coaches);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Could not retrieve coaches',
    });
  }
}


export async function updateCoachHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const id = Number(req.params.id);

  try {
    await updateCoach(body, id);
    log.info(`Coach:${id} updated successfully`);
    res.send('Coach updated successfully');
  } catch (err: any) {
    log.error(`Could not update coach id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not update the coach')
    );
  }
}
