import mongoose from 'mongoose';
import AdminModel from './admin.model';

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *      productID:
 *        type: string
 *      productName:
 *        type: string
 *      price:
 *        type: string
 *      remain:
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
const ProductSchema = new mongoose.Schema({
    productID:{type: String, required:true},
    productName: { type: String, required: true },
    price: { type: String, required: true },
    remain: { type: String, required: true },
    updatedBy: { type: mongoose.Schema.ObjectId, ref: 'AdminModel' },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'AdminModel' }
}, {
    timestamps: true
});

ProductSchema.set('toJSON', {
    transform(doc, ret, options) { // eslint-disable-line no-unused-vars
        delete ret.__v;
        delete ret.passWord;
    }
});

export default mongoose.model('product', ProductSchema);
