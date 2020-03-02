import {ArrayHelper, StringHelper} from '@k-will/core-helper';
import {ValidationHelper} from '@k-will/core-validation';
import mongoose from 'mongoose';

export const ValidationHelpers = new ValidationHelper();
export const ArrayHelpers = new ArrayHelper();
export const StringHelpers = new StringHelper();
export function isObject(id) {
  return mongoose.isValidObjectId(id);
}
