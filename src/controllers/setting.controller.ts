import { NextFunction, Request, Response } from 'express';
import {
  getAllSettings,
  getOneSetting,
  createSetting,
  updateSetting,
  deleteSetting,
} from '../services/setting.service';
import log from '../utils/logger';
import createAppError, { HttpCode } from '../utils/appError';

export async function getAllSettingsHandler(req: Request, res: Response) {
  const Settings = await getAllSettings();

  return res.send(Settings);
}

export async function getOneSettingHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  const Setting = await getOneSetting(id);

  return res.send(Setting);
}

export async function createSettingHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;

  try {
    const setting = await createSetting(body);
    return res.send({
      message: 'Setting created successfully',
      setting: setting
    });
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Setting already exists',
    });
  }
}

export async function updateSettingHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const id = Number(req.params.id);

  try {
    const setting = await updateSetting(body);
    log.info(`Setting:${id} updated successfully`);
    res.send({
      message: 'Setting updated successfully',
      setting: setting 
    });
  } catch (errors) {
    log.error(`Could not update Setting id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not update the Setting')
    );
  }
}

export async function deleteSettingHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  try {
    await deleteSetting(id);
    log.info('Setting deleted successfully');
    return res.send('Setting deleted successfully');
  } catch (errors) {
    log.error(`Could not delete Setting id: ${id}`);
    return next(
      createAppError(HttpCode.BAD_REQUEST, 'Could not delete the Setting')
    );
  }
}
