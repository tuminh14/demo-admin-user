import logger from "../../api/logger";
import {USER_ADMIN, PASS_ADMIN} from "../../config";
import AdminModel from '../../database/mongo/model/admin.model';
import { ValidationHelpers } from "../../util/Helper";
import APIError from "../../util/APIError";

export async function dummyAdmin() {
  try {
    if (!USER_ADMIN || !PASS_ADMIN) {
      logger.error('Please setup Admin Account.');
      throw new Error('Please setup Admin Account.');
    }
    let check = await AdminModel.findOne({userName: USER_ADMIN}).lean();
    if (!check) {
      await AdminModel.create({
        userName: USER_ADMIN,
        passWord: ValidationHelpers.createHash(PASS_ADMIN),
        role: 'root'
      })
    }
  } catch (error) {
    logger.error('User registry error:', error);
    throw error;
  }
}
