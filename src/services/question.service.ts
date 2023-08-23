import { Question } from '../entities/question.entity';
import AppDataSource from '../utils/connectToDb';

const questionRepository = AppDataSource.getRepository(Question);

export const createQuestion = async (input: Partial<Question>) => {
  return await questionRepository.save(questionRepository.create(input));
};

export const findQuestion = async (id: number) => {
  return await questionRepository.findOneBy({ id });
};
