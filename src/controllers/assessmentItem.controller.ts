import { Request, Response } from 'express';
import {
  createAssessmentItem,
  findAssessmentItem,
  getAllAssessmentItems,
} from '../services/assessmentItem.service';

export async function createAssessmentItemHandler(req: Request, res: Response) {
  const body = req.body;
  try {
    await createAssessmentItem(body);

    return res.send('Assessment item successfully created');
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Assessment item already exists',
    });
  }
}

export async function findAssessmentItemHandler(req: Request, res: Response) {
  const { id } = req.body;

  try {
    const assessment = await findAssessmentItem(id);

    return res.send(assessment);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Assessment item not found',
    });
  }
}

export async function getAllAssessmentItemsHandler(
  _req: Request,
  res: Response
) {
  try {
    const assessmentItems = await getAllAssessmentItems();

    return res.send(assessmentItems);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Could not retrieve assessment items',
    });
  }
}
