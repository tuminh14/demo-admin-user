import {ExpressValidation} from '@k-will/core-validation';
import UserModel from '../../database/mongo/model/user.model';
const UserValidation = new ExpressValidation();

export const registry = UserValidation.validation({
  body: {
    email: { type: 'Email', required: true },
    fullName: { type: 'String', required: true },
    userName: { type: 'String', required: true },
    passWord: { type: 'String', required: true },
    phoneNumber: { type: 'String', required: true }
  }
});

export const userLogin = UserValidation.validation({
  body: {
    userName: { type: 'String', required: true },
    passWord: { type: 'String', required: true }
  }
})

export const userBuyProduct = UserValidation.validation({
  body: {
    productID: { type: 'String', required: true },
    numOfProduct: {type: 'String', required: true }
  }
})

export const deleteUser = UserValidation.validation({
  params: {
    id: { type: 'ObjectId', required: true, model: UserModel }
  }
});

export const editUser = UserValidation.validation({
  params: {
    id: { type: 'ObjectId', required: true, model: UserModel }
  },
  body: {
    email: { type: 'Email', required: true },
    fullName: { type: 'String', required: true },
    userName: { type: 'String', required: true },
    passWord: { type: 'String', required: true },
    phoneNumber: { type: 'String', required: true }
  }
});


