import {
    File,
  } from '../entities/file.entity';
  import AppDataSource from '../utils/connectToDb';
  import { parse } from 'date-fns';
  import log from '../utils/logger';
  
  const FileRepository =
    AppDataSource.getRepository(File);
  
  export const createFile = async (
    input: Partial<File>
  ) => {
    return await FileRepository.save(
      FileRepository.create(input)
    );
  };
  
  export const updateFile = async (
    input: Partial<File>
  ) => {
    return await FileRepository.save(input);
  };
  
  export const findFile = async (id: number) => {
    return await FileRepository.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
        completedWorkout: true,
      },
    });
  };
  
  export const getAllFiles = async (query: any) => {
    const Files =
      FileRepository.createQueryBuilder('file');
  
    if (query.owner) {
      Files.andWhere({
        owner: {
          id: parseInt(query.owner),
        },
      });
    }
  
    Files.leftJoinAndSelect('file.owner', 'user');
    Files.leftJoinAndSelect('file.completedWorkout', 'completedWorkout');
    return await Files.getMany();
  };
  