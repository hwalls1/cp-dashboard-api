import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { User, RoleEnumType, StatusEnumType } from '../entities/user.entity';
import AppDataSource from '../utils/connectToDb';
import { File } from '../entities/file.entity';
import log from '../utils/logger';
import { Athlete } from '../entities/athlete.entity';
import { Coach } from '../entities/coach.entity';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: Partial<User>) => {
  const user = await userRepository.save(userRepository.create(input));

  log.info(user.id);
  return user;
};

export const findUserByEmail = async (email: string) => {
  return await userRepository.findOneBy({ email });
};

export const findUserById = async (userId: number) => {
  const user = userRepository.findOneOrFail({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
    where: {
      id: userId,
    },
    relations: ['athlete', 'coach', 'questionnaireResponses', 'profilePicture'],
  });
  
  console.log(user)
  return user;
};

export const findUser = async (query: object) => {
  return await userRepository.findOneBy(query);
};


export const getAllUsers = async (query: any) => {
  const users = userRepository.createQueryBuilder('users');

  if(query.search) {
    users.where("LOWER(users.name) like LOWER(:name)", { name: `%${query.search}%` });
  }

  users.leftJoinAndSelect('users.athlete', 'athlete');
  users.leftJoinAndSelect('users.coach', 'coach');
  users.leftJoinAndSelect('users.profilePicture', 'file');
  return await users.getMany();
};


export const updateUser = async (input: Partial<User>, id: number, password: any) => {
  const { name, email, role, profilePicture, status, athlete, coach } = input;

  const user = await userRepository.findOneOrFail({
    where: {
      id: id,
    },
  });

  user.name = name as string;
  user.email = email as string;
  user.role = role as RoleEnumType;
  user.profilePicture = profilePicture as File;
  user.status = status as StatusEnumType;
  user.athlete = athlete as Athlete;
  user.coach = coach as Coach;

  // only update password if it's not an empty string
  if(password) {
    user.password = password as string;
  }

  log.info(`New password: ${password}`)


  return await userRepository.save(user);
};

export const deleteUser = async (id: number) => {
  await userRepository.delete(id);
};
