import AppDataSource from '../utils/connectToDb';
import { Exercise, ExerciseType } from '../entities/exercise.entity';
import log from '../utils/logger';

const exerciseRepository = AppDataSource.getRepository(Exercise);

export const getAllExercises = async () => {
  const exercises = exerciseRepository.find({
    select: {
      id: true,
      name: true,
      title: true,
      type: true,
      description: true,
      link: true,
      notes: true,
      sets: true,
      reps: true,
    },
    relations: {},
    order: {},
  });

  return exercises;
};

export const getOneExercise = async (id: number) => {
  try {
    const exercise = exerciseRepository.findOneOrFail({
      where: {
        id: id,
      },
      select: {
        name: true,
        title: true,
        type: true,
        description: true,
        link: true,
        notes: true,
        sets: true,
        reps: true,
      },
      relations: {},
      order: {},
    });

    log.info(`Found exercise: ${id}`);
    return exercise;
  } catch (error) {
    return error;
  }
};

export const createExercise = async (input: Partial<Exercise>) => {
  // return await exerciseRepository.upsert(input, {
  //     conflictPaths: ["name"],
  //     skipUpdateIfNoValuesChanged: true, // supported by postgres, skips update if it would not change row values
  //     upsertType: "on-conflict-do-update", //  "on-conflict-do-update" | "on-duplicate-key-update" | "upsert" - optionally provide an UpsertType - 'upsert' is currently only supported by CockroachDB
  //   },
  // );

  return exerciseRepository.save(exerciseRepository.create(input));
};

export const updateExercise = async (input: Partial<Exercise>, id: number) => {
  const { name, title, type, description, link, notes, sets, reps, time } = input;

  const exercise = await exerciseRepository.findOneOrFail({
    where: {
      id: id,
    },
  });

  exercise.name = name as string;
  exercise.title = title as string;
  exercise.type = type as ExerciseType;
  exercise.description = description as string;
  exercise.link = link as string;
  exercise.notes = notes as string;
  exercise.sets = sets as number;
  exercise.reps = reps as number;
  exercise.time = time as number;
  await exerciseRepository.save(exercise);
};

export const deleteExercise = async (id: number) => {
  await exerciseRepository.delete(id);
};