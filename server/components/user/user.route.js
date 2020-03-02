import { Router } from 'express';
import * as UserController from './user.controller';
import { registry, userBuyProduct, userLogin } from './user.validator';
import {isUser} from "../../util/JWT/jwt";
const router = new Router();

router.route('/registry')
  .post(
    registry,
    UserController.registry
  );

router.route('/login')
    .post(
        userLogin,
        UserController.login
    );

router.route('/user-buy-product')
    .post(
        isUser.auth(),
        userBuyProduct,
        UserController.userBuyProduct
    );

export default router;
