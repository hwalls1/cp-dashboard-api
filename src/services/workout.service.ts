import { Workout } from '../entities/workout.entity';
import { Exercise } from '../entities/exercise.entity';
import AppDataSource from '../utils/connectToDb';
import log from '../utils/logger';
import { Like } from 'typeorm';

const workoutRepository = AppDataSource.getRepository(Workout);

export const createWorkout = async (input: Partial<Workout>) => {
  return await workoutRepository.save(workoutRepository.create(input));
};

export const findWorkout = async (id: number) => {
  const workout = await workoutRepository
    .createQueryBuilder('workouts')
    .leftJoinAndSelect('workouts.exercises', 'exercises')
    .andWhere('workouts.id = :id', { id: id })
    .getOneOrFail();
  log.info(`This is the inside id: ${id}`);
  return workout;
};

// returns all workouts
export const getAllWorkouts = async (query: any) => {
  let workouts = workoutRepository.createQueryBuilder('workouts');

  if (query.search) {
    workouts.andWhere('LOWER(workouts.title) LIKE LOWER(:title)', {
      title: `%${query.search.toLowerCase()}%`,
    });
  }

  workouts.leftJoinAndSelect('workouts.exercises', 'exercises');

  return await workouts.getMany();
};

// update workout
export const updateWorkout = async (input: Partial<Workout>, id: number) => {
  const { name, title, type, description, notes, exercises, exerciseOrder } = input;

  const workout = await workoutRepository.findOneOrFail({
    where: {
      id: id,
    },
  });

  workout.name = name as string;
  workout.title = title as string;
  workout.type = type as string;
  workout.description = description as string;
  workout.notes = notes as string;
  workout.exercises = exercises as Exercise[];
  workout.exerciseOrder = exerciseOrder as string;

  await workoutRepository.save(workout);
};

// delete workout
export const deleteWorkout = async (id: number) => {
  await workoutRepository.delete(id);
};
