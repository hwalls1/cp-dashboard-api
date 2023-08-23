import { Coach } from '../entities/coach.entity';
import AppDataSource from '../utils/connectToDb';

const coachRepository = AppDataSource.getRepository(Coach);

export const createCoach = async (input: Partial<Coach>) => {
  return await coachRepository.save(coachRepository.create(input));
};

export const findCoach = async (id: number) => {
  return await coachRepository.findOneBy({ id });
};

export const getAllCoaches = async ( query: any ) => {
  const coaches = coachRepository.createQueryBuilder('coaches');

  if (query.athlete) {
    coaches.andWhere({
      athlete: {
        id: parseInt(query.athlete),
      },
    });
  }

  coaches.leftJoinAndSelect('coaches.user', 'users');
  coaches.leftJoinAndSelect('coaches.athletes', 'athletes');
  coaches.leftJoinAndSelect('athletes.user', 'athleteUsers');
  return await coaches.getMany();
};

export const updateCoach = async (input: Partial<Coach>, id: number) => {
  const { organization, athletes } = input;

  const coach = await coachRepository.findOneOrFail({
    where: {
      id: id,
    },
  });

  coach.organization = organization as string;
  coach.athletes = athletes as any;
  await coachRepository.save(coach);
};