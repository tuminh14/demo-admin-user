import ProductModel from '../../database/mongo/model/product.model';
import APIError from '../../util/APIError';
import { CODE_ERROR } from '../../constants';
import logger from '../../api/logger';

export async function productCreatment(product) {
    try {
        const existedProduct = await ProductModel.findOne({$or: [{productID: product.productID}]});
        if (existedProduct) {
            return Promise.reject(new APIError(403, [
                {
                    msg: 'product already create',
                    param: CODE_ERROR.PRODUCT_DONT_EXISTS,
                },
            ]));
        }
        let productCreated = await ProductModel.create(product);
        return productCreated.toJSON();
    } catch (error) {
        logger.error('error productCreatment : ', error);
        return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
    }
}

// export async function productRemainCheck(product, options) {
//     try {
//         const existedProduct = await ProductModel.findOne({$or: [{productID: product.productID}]});
//         if (!existedProduct) {
//             return Promise.reject(new APIError(403,[
//                 {
//                     msg: 'product dont exists',
//                     param: CODE_ERROR.PRODUCT_DONT_EXIST,
//                 },
//             ]));
//         }
//         return parseInt(existedProduct.remain);
//     } catch (error) {
//         logger.error('error productRemainCheck : ', error);
//         return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
//     };
// }
