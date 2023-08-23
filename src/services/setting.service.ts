import AppDataSource from '../utils/connectToDb';
import { Setting } from '../entities/setting.entity';
import log from '../utils/logger';

const SettingRepository = AppDataSource.getRepository(Setting);

export const getAllSettings = async () => {
  const Settings =
    AppDataSource.getRepository(Setting).createQueryBuilder('settings');

  Settings.leftJoinAndSelect('settings.dashboardExercises', 'dashboardExercises')
    .leftJoinAndSelect('settings.leaderboardExercises', 'leaderboardExercises');


  return await Settings.getMany();
};

export const getOneSetting = async (id: number) => {
  try {
    const Setting = SettingRepository.findOneOrFail({
      where: {
        id: id,
      },
      select: {
        warmUpColor: true,
        mobilityColor: true,
        liftColor: true,
        throwColor: true,
        controlColor: true
      },
      relations: {
        dashboardExercises: true,
        leaderboardExercises: true,
      },
    });
    log.info(`Found Setting ${id}`);

    return Setting;
  } catch (error) {
    return error;
  }
};

export const createSetting = async (input: Partial<Setting>) => {
  return SettingRepository.save(SettingRepository.create(input));
};

export const updateSetting = async (input: Partial<Setting>) => {
  return await SettingRepository.save(input);
};

export const deleteSetting = async (id: number) => {
  await SettingRepository.delete(id);
};