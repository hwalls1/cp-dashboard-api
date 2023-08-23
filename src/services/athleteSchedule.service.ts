import { AthleteSchedule } from '../entities/athleteSchedule.entity';
import AppDataSource from '../utils/connectToDb';

const athleteScheduleRepository = AppDataSource.getRepository(AthleteSchedule);

export const createAthleteSchedule = async (
  athleteSchedule: Partial<AthleteSchedule>
) => {
  return await athleteScheduleRepository.save(
    athleteScheduleRepository.create(athleteSchedule)
  );
};

export const updateAthleteSchedule = async (
  athleteSchedule: Partial<AthleteSchedule>
) => {
  return await athleteScheduleRepository.save(athleteSchedule);
};

export const findAthleteScheduleByAthlete = async (athleteId: number) => {
  const athleteSchedule = await athleteScheduleRepository.findOneOrFail({
    where: {
      athlete: {
        id: Number(athleteId),
      },
    },
    select: {
      id: true,
      workouts: true,
    },
    relations: {
      athlete: true,
    },
    order: {},
  });

  return athleteSchedule;
};

export const getAllAthleteSchedules = async () => {
  return await athleteScheduleRepository.find({
    select: {
      id: true,
      workouts: true,
    },
    relations: {
      athlete: true,
    },
  });
};
