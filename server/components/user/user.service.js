import UserModel from '../../database/mongo/model/user.model';
import ProductModel from '../../database/mongo/model/product.model';
import logger from '../../api/logger';
import APIError from '../../util/APIError';
import { jwt } from '../../util/JWT/jwt';
import { ValidationHelpers } from '../../util/Helper';
import { ADMIN_ROLE, CODE_ERROR } from '../../constants';

const crypto = require('crypto');

/**
 * Create new user
 * @param user
 * @param {string} user.userName
 * @param {string} user.passWord
 * @param {string} user.email
 * @param {string} user.phoneNumber
 * @param {string} user.fullName
 * @returns {Promise<*>}
 */
export async function registry(user) {
  try {
    const existedUser = await UserModel.findOne({ $or: [{ email: user.email }, { userName: user.userName }] });
    if (existedUser) {
      return Promise.reject(new APIError(403, [
        {
          msg: 'email/userName account already created',
          param: CODE_ERROR.USER_EXISTS,
        },
      ]));
    }
    user.passWord = ValidationHelpers.createHash(user.passWord);
    user.buyHistory = [];
    const userCreated = await UserModel.create(user);
    return userCreated.toJSON();
  } catch (error) {
    logger.error('error userRegistry : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'));
  }
}

/**
 * User Login
 * @param options
 * @param {string} options.userName
 * @param {string} options.passWord
 * @returns {Promise<*>}
 * */

export async function login(options) {
  try {
    const user = await UserModel.findOne({ userName: options.userName });
    if (!user) {
      return Promise.reject(new APIError(404, [
        {
          msg: 'USER_NOT_FOUND',
          params: CODE_ERROR.USER_NOT_FOUND
        }
      ]));
    }
    if (ValidationHelpers.comparePassword(user.passWord, options.passWord)) {
      return {
        data: user,
        token: jwt.issue({ _id: user._id }),
        expiredTime: jwt.getExpiredTime()
      };
    }
      return Promise.reject(new APIError(400, [
        {
          msg: 'PASSWORD_NOT_MATCH',
          params: CODE_ERROR.PASSWORD_NOT_MATCH
        }
      ]));
  } catch (error) {
    logger.error('error login : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'));
  }
}

/**
 * User Login
 * @param options
 * @param {string} options.productID
 * @param {string} options.numOfProduct
 * @param {object} options.user
 * @returns {Promise<*>}
 * */

export async function userBuyProduct(options) {
  try {
    const productInfo = await ProductModel.findOne({ productID: options.productID });
    const buyAllowed = parseInt(productInfo.remain) >= 0 || parseInt(options.numOfProduct) < parseInt(productInfo.remain);
    if (!productInfo) {
      return Promise.reject(new APIError(404, [
        {
          msg: 'PRODUCT_NOT_FOUND',
          params: CODE_ERROR.PRODUCT_DONT_EXISTS
        }
      ]));
    }
    if (buyAllowed) {
      const bill = {};
      bill.id = await crypto.randomBytes(6).toString('hex');
      bill.date = new Date();
      bill.productName = productInfo.productName;
      bill.price = await (parseInt(options.numOfProduct) * parseInt(productInfo.price)).toString();
      const buyHistory = options.user.buyHistory;
      buyHistory.unshift(bill);
      const userQuery = UserModel.findOne({_id: options.user._id})
      const userValues = { $set: { buyHistory: buyHistory } };
      await UserModel.updateOne(userQuery, userValues);

      const myQuery = { productID: options.productID };
      const productRemain = (parseInt(productInfo.remain) - parseInt(options.numOfProduct)).toString();
      const newValues = { $set: { remain: productRemain, updateAt: new Date()} };
      await ProductModel.updateOne(myQuery, newValues);
      const newProduct = await ProductModel.findOne({ productID: options.productID });
      return {
        status: true,
        price: await (parseInt(options.numOfProduct) * parseInt(productInfo.price)).toString(),
        data: newProduct
      };
    }
      return Promise.reject(new APIError(404, [
        {
          msg: 'NOT_ENOUGH_RESOURCES',
          params: CODE_ERROR.NOT_ENOUGH_RESOURCES
        }
      ]));
  } catch (error) {
    logger.error('error login : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'));
  }
}
