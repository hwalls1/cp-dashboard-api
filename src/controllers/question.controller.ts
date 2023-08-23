import { Request, Response } from 'express';
import { createQuestion, findQuestion } from '../services/question.service';

export async function createQuestionHandler(req: Request, res: Response) {
  const body = req.body;
  try {
    await createQuestion(body);

    return res.send('Question successfully created');
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Question already exists',
    });
  }
}

export async function findQuestionHandler(req: Request, res: Response) {
  const { id } = req.body;

  try {
    const question = await findQuestion(id);

    return res.send(question);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Question not found',
    });
  }
}
