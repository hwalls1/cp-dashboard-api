import { Request, Response } from 'express';
import {
  createAssessment,
  findAssessment,
  getAllAssessments,
  updateAssessment
} from '../services/assessment.service';

export async function createAssessmentHandler(req: Request, res: Response) {
  const body = req.body;
  try {
    await createAssessment(body);

    return res.send('Assessment successfully created');
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Assessment creation failed',
      error: err,
    });
  }
}

export async function findAssessmentHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const assessment = await findAssessment(id);

    return res.send(assessment);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Assessment not found',
    });
  }
}

export async function getAllAssessmentsHandler(_req: Request, res: Response) {
  try {
    const assessments = await getAllAssessments();

    return res.send(assessments);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Could not retrieve assessments',
    });
  }
}


export async function updateAssessmentHandler(
  req: Request,
  res: Response
) {
  const assessment = req.body;

  try {
    await updateAssessment(assessment);
    return res.send({
      message: 'Assessment successfully updated',
      assessment: assessment,
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Failed to update assessment',
      });
    }
  }
}
