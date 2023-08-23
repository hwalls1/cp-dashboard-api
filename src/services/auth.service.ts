import { Session } from '../entities/session.entity';
import { User } from '../entities/user.entity';
import AppDataSource from '../utils/connectToDb';

const sessionRepository = AppDataSource.getRepository(Session);

export const findOrCreateSession = async (user: User) => {
  const existingSession = await findSessionByUser(user.id);

  if (existingSession) {
    return existingSession;
  }

  const newSession = new Session();
  newSession.user = user;
  return sessionRepository.save(sessionRepository.create(newSession));
};

export const findSessionByUser = async (id: number) => {
  return sessionRepository.findOneBy({
    user: {
      id: id,
    },
  });
};

export const findSessionById = async (id: number) => {
  return sessionRepository.findOneBy({ id });
};

export const updateSessionById = async (id: number) => {
  const userSession = await findSessionByUser(id);
  return sessionRepository.update(userSession!.id, { valid: false });
};
