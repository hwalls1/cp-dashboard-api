import { NextFunction, Request, Response } from 'express';
import log from '../utils/logger';
import {
  createQuestionnaireResponse,
  deleteQuestionnaireResponse,
  getAllQuestionnaireResponses,
  getOneQuestionnaireResponse,
  updateQuestionnaireResponse,
} from '../services/questionnaireResponse.service';
import createAppError, { HttpCode } from '../utils/appError';

export async function getAllQuestionnaireResponsesHandler(
  _req: Request,
  res: Response
) {
  const questionnaireResponses = await getAllQuestionnaireResponses(_req.query);

  return res.send(questionnaireResponses);
}

export async function getOneQuestionnaireResponseHandler(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  const questionnaireResponse = await getOneQuestionnaireResponse(id);

  return res.send(questionnaireResponse);
}

export async function createQuestionnaireResponseHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  try {
    const questionnaireResponse = await createQuestionnaireResponse(body);

    return res.send({
      message: 'Questionnaire Response created successfully',
      questionnaireResponse: questionnaireResponse,
    });
  } catch (err: any) {
    log.error(err);
    return next(
      createAppError(
        HttpCode.BAD_REQUEST,
        'Could not create the questionnaireResponse'
      )
    );
  }
}

export async function updateQuestionnaireResponseHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const id = Number(req.params.id);

  try {
    await updateQuestionnaireResponse(body, id);
    log.info(`Questionnaire Response:${id} updated successfully`);
    res.send('Questionnaire Response updated successfully');
  } catch (err: any) {
    log.error(`Could not update Questionnaire Response id: ${id}`);
    return next(
      createAppError(
        HttpCode.BAD_REQUEST,
        'Could not update the Questionnaire Response'
      )
    );
  }
}

export async function deleteQuestionnaireResponseHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  try {
    await deleteQuestionnaireResponse(id);
    log.info(`QuestionnairveResponse:${id} deleted successfuly`);
    return res.send('Questionnaire Response deleted successfully');
  } catch (error) {
    log.error(`Could not delete the Questionnaire Response id: ${id}`);
    return next(
      createAppError(
        HttpCode.BAD_REQUEST,
        'Could not delete the Questionnaire Response'
      )
    );
  }
}
