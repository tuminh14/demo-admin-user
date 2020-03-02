import mongoose from 'mongoose';
import AdminModel from './admin.model'

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *      email:
 *        type: string
 *      fullName:
 *        type: string
 *      userName:
 *        type: string
 *      phoneNumber:
 *        type: string
 *      updatedBy:
 *        type: string
 *      createdBy:
 *        type: string
 *      updatedAt:
 *        type: date
 *      createdAt:
 *        type: date
 *
 */
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  userName: { type: String, required: true },
  passWord: { type: String, required: true },
  phoneNumber: { type: String, index: 1 },
  updatedBy: { type: mongoose.Schema.ObjectId, ref: 'AdminModel' },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'AdminModel' },
  buyHistory: { type: Array, required: true }
}, {
  timestamps: true
});

UserSchema.set('toJSON', {
  transform(doc, ret, options) { // eslint-disable-line no-unused-vars
    delete ret.__v;
    delete ret.passWord;
  }
});

export default mongoose.model('User', UserSchema);
