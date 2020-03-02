import mongoose from 'mongoose';
import {ADMIN_ROLE} from "../../../constants";

/**
 * @swagger
 * definitions:
 *  Admin:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *      userName:
 *        type: string
 *      passWord:
 *        type: string
 *      role:
 *        type: string
 *      online:
 *        type: boolean
 *      updatedAt:
 *        type: date
 *      createdAt:
 *        type: date
 */
const AdminSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  passWord: { type: String, required: true },
  role: { type: String, enum: Object.values(ADMIN_ROLE), required: true },
  online: { type: Boolean, default: false }
}, {
  timestamps: true
});

AdminSchema.set('toJSON', {
  transform(doc, ret, options) { // eslint-disable-line no-unused-vars
    delete ret.__v;
    delete ret.password;
  }
});

export default mongoose.model('Admin', AdminSchema);
