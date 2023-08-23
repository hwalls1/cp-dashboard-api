import {
  CompletedExercise,
  CompletedExerciseType,
} from '../entities/completedExercise.entity';
import AppDataSource from '../utils/connectToDb';
import { parse } from 'date-fns';
import log from '../utils/logger';

const completedExerciseRepository =
  AppDataSource.getRepository(CompletedExercise);

export const createCompletedExercise = async (
  input: Partial<CompletedExercise>
) => {
  return await completedExerciseRepository.save(
    completedExerciseRepository.create(input)
  );
};

export const updateCompletedExercise = async (
  input: Partial<CompletedExercise>
) => {
  return await completedExerciseRepository.save(input);
};

export const findCompletedExercise = async (id: number) => {
  return await completedExerciseRepository.findOne({
    where: {
      id,
    },
    relations: {
      athlete: true,
      completedWorkout: true,
    },
  });
};

export const getAllCompletedExercises = async (query: any) => {
  const completedExercises =
    completedExerciseRepository.createQueryBuilder('completedExercise');

  if (query.athlete) {
    completedExercises.andWhere({
      athlete: {
        id: parseInt(query.athlete),
      },
    });
  }

  if (query.exerciseIds) {
    completedExercises.andWhere('completedExercise.exerciseId IN (:...ids)', { ids: decodeURI(query.exerciseIds).split(",").map((id: string) => Number(id)) })
  }

  if (query.title) {
    completedExercises.andWhere('completedExercise.title = :title', {
      title: query.title,
    });
  }

  if (query.type) {
    // check if there is an enum that matches this
    if (Object.values(CompletedExerciseType).includes(query.type)) {
      completedExercises.andWhere('completedExercise.type = :type', {
        type: query.type,
      });
    }
  }

  if (query.startDate && query.endDate) {
    completedExercises.andWhere('completedExercise.created_at >= :after', {
      after: parse(query.startDate, 'yyyy-MM-dd', new Date()),
    });
    completedExercises.andWhere('completedExercise.created_at < :before', {
      before: parse(query.endDate, 'yyyy-MM-dd', new Date()),
    });
  }

  completedExercises.leftJoinAndSelect('completedExercise.athlete', 'athlete');
  return await completedExercises.getMany();
};
