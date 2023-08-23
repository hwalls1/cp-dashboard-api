import { parse } from 'date-fns';
import { CompletedWorkout, CompletedWorkoutType } from '../entities/completedWorkout.entity';
import AppDataSource from '../utils/connectToDb';

const completedWorkoutRepository =
  AppDataSource.getRepository(CompletedWorkout);

export const createCompletedWorkout = async (
  input: Partial<CompletedWorkout>
) => {
  return await completedWorkoutRepository.save(
    completedWorkoutRepository.create(input)
  );
};

export const updateCompletedWorkout = async (
  input: Partial<CompletedWorkout>
) => {
  return await completedWorkoutRepository.save(input);
};

export const findCompletedWorkout = async (id: number) => {
  return await completedWorkoutRepository.findOne({
    where: {
      id,
    },
    relations: {
      athlete: true,
      completedExercises: true,
      pitches: true
    },
  });
};

export const getAllCompletedWorkouts = async (query: any) => {
  const completedWorkouts =
  completedWorkoutRepository.createQueryBuilder('completedWorkouts');

  if (query.athlete) {
    completedWorkouts.andWhere({
      athlete: {
        id: parseInt(query.athlete),
      },
    });
  }

  if (query.title) {
    completedWorkouts.andWhere('completedWorkouts.title = :title', {
      title: query.title,
    });
  }

  if (query.type) {
    // check if there is an enum that matches this
    if (Object.values(CompletedWorkoutType).includes(query.type)) {
      completedWorkouts.andWhere('completedWorkouts.type = :type', {
        type: query.type,
      });
    }
  }

  if (query.startDate && query.endDate) {
    completedWorkouts.andWhere('completedWorkouts.created_at >= :after', {
      after: parse(query.startDate, 'yyyy-MM-dd', new Date()),
    });
    completedWorkouts.andWhere('completedWorkouts.created_at < :before', {
      before: parse(query.endDate, 'yyyy-MM-dd', new Date()),
    });
  }

  completedWorkouts.leftJoinAndSelect('completedWorkouts.athlete', 'athlete');
  completedWorkouts.leftJoinAndSelect('completedWorkouts.completedExercises', 'completedExercises');
  completedWorkouts.leftJoinAndSelect('completedWorkouts.pitches', 'pitches');
  return await completedWorkouts.getMany();
  // return await completedWorkoutRepository.find({
  //   select: {
  //     id: true,
  //     title: true,
  //     type: true,
  //     created_at: true,
  //   },
  //   relations: {
  //     athlete: true,
  //     completedExercises: true,
  //     pitches: true,
  //   },
  // });
};
