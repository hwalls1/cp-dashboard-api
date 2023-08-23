import { Assessment } from '../entities/assessment.entity';
import AppDataSource from '../utils/connectToDb';
import log from '../utils/logger';

const assessmentRepository = AppDataSource.getRepository(Assessment);

export const createAssessment = async (input: Partial<Assessment>) => {
  return await assessmentRepository.save(assessmentRepository.create(input));
};

export const findAssessment = async (id: number) => {
  try {
    const assessment = assessmentRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: ['assessmentItems'],
    });
    log.info(`Found assessment ${id}`);

    return assessment;
  } catch (error) {
    return error;
  }
};

export const getAllAssessments = async () => {
  return await assessmentRepository.find({
    select: {
      id: true,
      title: true,
      type: true,
    },
    relations: {
      assessmentItems: true,
    },
  });
};

export const updateAssessment = async (
  assessment: Partial<Assessment>
) => {
  return await assessmentRepository.save(assessment);
};
