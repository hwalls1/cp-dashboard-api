import { Athlete, HandedType, LevelType } from '../entities/athlete.entity';
import { AthleteSchedule } from '../entities/athleteSchedule.entity';
import { Coach } from '../entities/coach.entity';
import AppDataSource from '../utils/connectToDb';
import log from '../utils/logger';

const athleteRepository = AppDataSource.getRepository(Athlete);
const athleteScheduleRepository = AppDataSource.getRepository(AthleteSchedule);

export const createAthlete = async (input: Partial<Athlete>) => {
  const athlete = await athleteRepository.save(athleteRepository.create(input));

  const athleteSchedule = new AthleteSchedule();
  athleteSchedule.athlete = athlete;
  athleteSchedule.workouts = '{}';

  await athleteScheduleRepository.save(athleteSchedule);

  return athlete;
};

export const findAthlete = async (id: number) => {
  try {
    const athlete = athleteRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: ['user', 'coach', 'athleteSchedule', 'coach.user'],
    });
    log.info(`Found Chat ${id}`);

    return athlete;
  } catch (error) {
    return error;
  }
};

export const getAllAthletes = async () => {
  return await athleteRepository.find({
    select: {
      id: true,
      height: true,
      weight: true,
      organization: true,
      handed: true,
      level: true,
    },
    relations: ['user', 'coach', 'athleteSchedule', 'coach.user']
  });
};


export const updateAthlete = async (input: Partial<Athlete>, id: number) => {
  const { age, organization, height, weight, handed, level, coach } = input;

  const athlete = await athleteRepository.findOneOrFail({
    where: {
      id: id,
    },
  });

  athlete.age = age as number;
  athlete.organization = organization as string;
  athlete.height = height as string;
  athlete.weight = weight as number;
  athlete.handed = handed as HandedType;
  athlete.level = level as LevelType;
  athlete.coach = coach as Coach;
  await athleteRepository.save(athlete);
};

export const deleteAthlete = async (id: number) => {
  await athleteRepository.delete(id);
};