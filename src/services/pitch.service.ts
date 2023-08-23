import AppDataSource from '../utils/connectToDb';
import { Pitch, PitchType, ThrowType } from '../entities/pitch.entity';
import { Athlete } from '../entities/athlete.entity';

const pitchRepository = AppDataSource.getRepository(Pitch);

export const getAllPitches = async (query: any) => {
  const throwType = Object.values(ThrowType).includes(query.throwType)
    ? query.throwType
    : null;

  return await pitchRepository.find({
    select: {
      id: true,
      created_at: true,
      date: true,
      type: true,
      throwType: true,
      velocity: true,
      distance: true,
    },
    relations: {
      athlete: true,
      completedWorkout: true,
    },
    where: {
      throwType: throwType,
      athlete: {
        id: query.athlete,
      },
      completedWorkout: {
        id: query.workout,
      },
    },
  });
};

export const getOnePitch = async (id: number) => {
  try {
    const pitch = pitchRepository.findOneOrFail({
      where: {
        id: id,
      },
      select: {
        created_at: true,
        type: true,
        velocity: true,
        distance: true,
      },
      order: {},
      relations: {
        athlete: true,
      },
    });

    return pitch;
  } catch (error) {
    return error;
  }
};

export const createPitch = async (input: Partial<Pitch>) => {
  return pitchRepository.save(pitchRepository.create(input));
};

export const updatePitch = async (input: Partial<Pitch>, id: number) => {
  const { athlete, type, velocity, distance } = input;

  const pitch = await pitchRepository.findOneOrFail({
    where: {
      id: Number(id),
    },
  });

  pitch.athlete = athlete as Athlete;
  pitch.type = type as PitchType;
  pitch.velocity = velocity as number;
  pitch.distance = distance as number;

  await pitchRepository.save(Pitch);
};

export const deletePitch = async (id: number) => {
  await pitchRepository.delete(id);
};
