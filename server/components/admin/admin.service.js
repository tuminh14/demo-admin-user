import AdminModel from '../../database/mongo/model/admin.model';
import { ValidationHelpers } from "../../util/Helper";
import logger from "../../api/logger";
import APIError from "../../util/APIError";
import {ADMIN_ROLE, CODE_ERROR} from "../../constants";
import {jwt} from "../../util/JWT/jwt";
import UserModel from "../../database/mongo/model/user.model";
import ProductModel from "../../database/mongo/model/product.model"
import {registry} from "../user/user.service";
import {productCreatment} from '../product/product.service';

/**
 * Create new user
 * @param options
 * @param options.userName
 * @param options.passWord
 * @returns {Promise<*>}
 */
export async function adminLogin(options) {
  try {
    let admin = await AdminModel.findOne({userName: options.userName});
    if (!admin) {
      return Promise.reject(new APIError(404, [
        {
          msg: 'Not Found',
          params: CODE_ERROR.ADMIN_NOT_FOUND
        }
      ]))
    }
    if (ValidationHelpers.comparePassword(admin.passWord, options.passWord)) {
      await AdminModel.updateOne({
        _id: admin._id
      }, {
        $set: {
          online: true
        }
      });
      return {
        user: admin,
        token: jwt.issue({_id: admin._id, role: admin.role}),
        expiredTime: jwt.getExpiredTime()
      }
    } else {
      return Promise.reject(new APIError(40, [
        {
          msg: 'Invalid UserName/Password',
          params: CODE_ERROR.INVALID_PARAMS
        }
      ]))
    }
  } catch (error) {
    logger.error('error admin login : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}


/**
 * Admin Edit User
 * @param {object} options
 * @param {string} options.userName
 * @param {string} options.passWord
 * @param {string} options.email
 * @param {string} options.phoneNumber
 * @param {string} options.fullName
 * @param {object} options.admin
 * @param {ObjectId} options.id
 * @returns {Promise<*>}
 * */
export async function editUserByAdmin(options) {
  try {
    if (options.admin.role !== ADMIN_ROLE.ROOT) {
      return Promise.reject(new APIError(401, [
        {
          msg: 'Not permission',
          params: CODE_ERROR.NOT_PERMISSION
        }
      ]))
    }
    let user = await UserModel.findById(options.id);
    user.userName = options.userName || user.userName;
    user.passWord = options.passWord ? ValidationHelpers.createHash(options.passWord) : user.passWord;
    user.email = options.email || user.email;
    user.phoneNumber = options.phoneNumber || user.phoneNumber;
    user.fullName = options.fullName || user.fullName;
    user.updatedBy = options.admin || user.admin;
    user.updatedAt = new Date();
    await user.save();
    return user.toJSON();
  } catch (error) {
    logger.error('error editUserByAdmin : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}

/**
 * Admin Edit Product
 * @param {object} options
 * @param {string} options.productName
 * @param {string} options.remain
 * @param {string} options.price
 * @param {object} options.admin
 * @param {ObjectId} options.id
 * @returns {Promise<*>}
 * */
export async function editProductByAdmin(options) {
  try {
    if (options.admin.role !== ADMIN_ROLE.ROOT) {
      return Promise.reject(new APIError(401, [
        {
          msg: 'Not permission',
          params: CODE_ERROR.NOT_PERMISSION
        }
      ]));
    }
    let product = await ProductModel.findById(options.id);
    product.productName = options.productName || product.productName;
    product.remain = options.remain || product.remain;
    product.price = options.price || product.price;
    product.updatedBy = options.admin || user.admin;
    product.updatedAt = new Date();
    await product.save();
    return product.toJSON();
  } catch (error) {
    logger.error('error editUserByAdmin : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}

/**
 * Admin Add New User
 * @param {object} options
 * @param {string} options.userName
 * @param {string} options.passWord
 * @param {string} options.email
 * @param {string} options.phoneNumber
 * @param {string} options.fullName
 * @param {object} options.admin
 * @returns {Promise<*>}
 * */
export async function adminAddUser(options) {
  try {
    if (options.admin.role !== ADMIN_ROLE.ROOT) {
      return Promise.reject(new APIError(401, [
        {
          msg: 'Not permission',
          params: CODE_ERROR.NOT_PERMISSION
        }
      ]))
    }
    options.createdBy = options.admin._id;
    delete options.admin;
    return await registry(options);
  } catch (error) {
    logger.error('error adminAddUser : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}

/**
 * Admin Add New product
 * @param {object} options
 * @param {string} options.productName
 * @param {string} options.price
 * @param {string} options.remain
 * @param {object} options.admin
 * @returns {Promise<*>}
 * */
export async function adminAddProduct(options) {
  try {
    if (options.admin.role !== ADMIN_ROLE.ROOT) {
      return Promise.reject(new APIError(401, [
        {
          msg: 'Not permission',
          params: CODE_ERROR.NOT_PERMISSION
        }
      ]))
    }
    options.createdBy = options.admin._id;
    delete options.admin;
    return await productCreatment(options);
  } catch (error) {
    logger.error('error adminAddUserProduct : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'));
  }
}

/**
 * Admin Delete User
 * @param {object} options
 * @param {object} options.admin
 * @param {string} options.id
 * @returns {Promise<*>}
 * */
export async function adminDeleteUser(options) {
  try {
    console.log(options.id);
    await UserModel.remove({
      _id: options.id
    });
    return true
  } catch (error) {
    logger.error('error adminDeleteUser : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}

/**
 * Admin Delete User
 * @param {object} options
 * @param {object} options.admin
 * @param {string} options.id
 * @returns {Promise<*>}
 * */
export async function adminDeleteProduct(options) {
  try {
    console.log(options.id);
    await ProductModel.remove({
      _id: options.id
    });
    return true
  } catch (error) {
    logger.error('error adminDeleteProduct : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}

/**
 * Admin Get List User
 * @param {object} options
 * @param {object} options.admin
 * @param {number} options.limit
 * @param {number} options.skip
 * @param {string} options.text
 * @returns {Promise<*>}
 * */
export async function adminGetListUser(options) {
  try {
    let conditions = {};
    if (options.text) {
      conditions['$or'] = [
        {
          userName: { $regex: options.text, $options: "i" }
        },
        {
          fullName: { $regex: options.text, $options: "i" }
        }
      ]
    }
    let count = await UserModel.countDocuments(conditions);
    let data = await UserModel.find(conditions).sort({createdAt: -1}).limit(options.limit).skip(options.skip).lean();
    return [count, data];
  } catch (error) {
    logger.error('error adminGetListUser : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}

/**
 * Admin Get List User
 * @param {object} options
 * @param {object} options.admin
 * @param {number} options.limit
 * @param {number} options.skip
 * @param {string} options.text
 * @returns {Promise<*>}
 * */
export async function adminGetListProduct(options) {
  try {
    let conditions = {};
    if (options.text) {
      conditions = [
        {
          productID: { $regex: options.text, $options: 'i' }
        }
      ]
    };
    let count = await ProductModel.countDocuments(conditions);
    let data = await ProductModel.find(conditions).sort({createdAt: -1}).limit(options.limit).skip(options.skip).lean();
    return [count, data];
  } catch (error) {
    logger.error('error adminGetListProduct : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}
