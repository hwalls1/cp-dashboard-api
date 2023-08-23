import { NextFunction, Request, Response } from 'express';
import {
  createAthlete,
  findAthlete,
  getAllAthletes,
  updateAthlete,
  deleteAthlete
} from '../services/athlete.service';
import log from '../utils/logger';
import createAppError, { HttpCode } from '../utils/appError';

export async function createAthleteHandler(req: Request, res: Response) {
  const body = req.body;
  try {
    await createAthlete(body);

    return res.send('Athlete successfully created');
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Athlete already exists',
    });
  }
}

export async function findAthleteHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const athlete = await findAthlete(id);

    return res.send(athlete);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Athlete not found',
    });
  }
}

export async function getAllAthletesHandler(_req: Request, res: Response) {
  try {
    const athlete = await getAllAthletes();

    return res.send(athlete);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Could not retrieve athletes',
    });
  }
}


export async function updateAthleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const id = Number(req.params.id);

  try {
    const athlete = await updateAthlete(body, id);
    res.send({
      message: 'Athlete updated successfully',
      athlete: athlete
    });
  } catch (err: any) {
    log.error(`Could not update athlete id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not update the athlete')
    );
  }
}

export async function deleteAthleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  try {
    await deleteAthlete(id);
    log.info(`Athlete: ${id} deleted successfuly`);
    return res.send('Athlete deleted successfully');
  } catch (error) {
    log.error(`Could not delete the athlete with id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not delete the athlete')
    );
  }
}