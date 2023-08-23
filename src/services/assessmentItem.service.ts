import { AssessmentItem } from '../entities/assessmentItem.entity';
import AppDataSource from '../utils/connectToDb';

const assessmentItemRepository = AppDataSource.getRepository(AssessmentItem);

export const createAssessmentItem = async (input: Partial<AssessmentItem>) => {
  return await assessmentItemRepository.save(
    assessmentItemRepository.create(input)
  );
};

export const findAssessmentItem = async (id: number) => {
  return await assessmentItemRepository.findOneBy({ id });
};

export const getAllAssessmentItems = async () => {
  return await assessmentItemRepository.find({
    select: {
      id: true,
      title: true,
      type: true,
      notes: true,
    },
  });
};
