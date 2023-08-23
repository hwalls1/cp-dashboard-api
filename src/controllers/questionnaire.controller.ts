import { NextFunction, Request, Response } from 'express';
import log from '../utils/logger';
import {
  createQuestionnaire,
  deleteQuestionnaire,
  getAllQuestionnaires,
  getOneQuestionnaire,
  updateQuestionnaire,
} from '../services/questionnaire.service';
import createAppError, { HttpCode } from '../utils/appError';

export async function getAllQuestionnairesHandler(
  _req: Request,
  res: Response
) {
  const questionnaires = await getAllQuestionnaires(_req.query);

  return res.send(questionnaires);
}

export async function getOneQuestionnaireHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  const questionnaire = await getOneQuestionnaire(id);

  return res.send(questionnaire);
}

export async function createQuestionnaireHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  try {
    const questionnaire = await createQuestionnaire(body);

    return res.send({
      message: 'Questionnaire created successfully',
      questionnaire: questionnaire,
    });
  } catch (err: any) {
    log.error(`Questionnaire already exists`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not create the Questionnaire')
    );
  }
}

export async function updateQuestionnaireHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const id = Number(req.params.id);

  try {
    await updateQuestionnaire(body, id);
    log.info(`Questionnaire:${id} updated successfully`);
    res.send('Questionnaire updated successfully');
  } catch (err: any) {
    log.error(`Could not update Questionnaire id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not update the Questionnaire')
    );
  }
}

export async function deleteQuestionnaireHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  try {
    await deleteQuestionnaire(id);
    log.info(`Questionnaire:${id} deleted successfuly`);
    return res.send('Questionnaire deleted successfully');
  } catch (error) {
    log.error(`Could not delete the Questionnaire id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not delete the Questionnaire')
    );
  }
}
