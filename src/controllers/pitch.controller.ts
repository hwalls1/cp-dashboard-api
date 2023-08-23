import { NextFunction, Request, Response } from 'express';
import {
  getAllPitches,
  getOnePitch,
  createPitch,
  updatePitch,
  deletePitch,
} from '../services/pitch.service';
import log from '../utils/logger';
import createAppError, { HttpCode } from '../utils/appError';

export async function getAllPitchesHandler(req: Request, res: Response) {
  const Pitchs = await getAllPitches(req.query);

  return res.send(Pitchs);
}

export async function getOnePitchHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  const Pitch = await getOnePitch(id);

  return res.send(Pitch);
}

export async function createPitchHandler(req: Request, res: Response) {
  const body = req.body;

  try {
    const pitches = await createPitch(body);
    return res.send({
      message: 'Pitch created successfully',
      pitches: pitches
    });
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Pitch already exists',
    });
  }
}

export async function updatePitchHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const id = Number(req.params.id);

  try {
    await updatePitch(body, id);
    log.info(`Pitch:${id} updated successfully`);
    res.send('Pitch updated successfully');
  } catch (errors) {
    log.error(`Could not update Pitch id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not update the Pitch')
    );
  }
}

export async function deletePitchHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  try {
    await deletePitch(id);
    log.info('Pitch deleted successfully');
    return res.send('Pitch deleted successfully');
  } catch (errors) {
    log.error(`Could not delete Pitch id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not delete the Pitch')
    );
  }
}
