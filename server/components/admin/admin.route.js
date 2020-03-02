import * as Admin_Controller from './admin.controller';
import { Router } from 'express';
import {
  AdminLogin,
  AdminAddUser,
  AdminEditUser,
  AdminDeleteUser,
  AdminGetListUser,
  AdminAddProduct,
  AdminEditProduct,
  AdminDeleteProduct, AdminGetListProduct
} from './admin.validation';
import {isAdmin} from "../../util/JWT/jwt";
const router = new Router();

router.route('/login')
  .post(
    AdminLogin,
    Admin_Controller.adminLogin
  );

router.route('/user/add-user')
  .post(
    isAdmin.auth(),
    AdminAddUser,
    Admin_Controller.adminAddUser
  );
router.route('/product/add-product')
    .post(
        isAdmin.auth(),
        AdminAddProduct,
        Admin_Controller.adminAddProduct
    );

router.route('/user/:id')
  .put(
    isAdmin.auth(),
    AdminEditUser,
    Admin_Controller.editUserByAdmin
  )
  .delete(
    isAdmin.auth(),
    AdminDeleteUser,
    Admin_Controller.adminDeleteUser
  );

router.route('/product/:id')
    .delete(
      isAdmin.auth(),
      AdminDeleteProduct,
      Admin_Controller.adminDeleteProduct
  ).put(
    isAdmin.auth(),
    AdminEditProduct,
    Admin_Controller.editProductByAdmin
);

router.route('/user/get-all-user')
  .get(
    isAdmin.auth(),
    AdminGetListUser,
    Admin_Controller.adminGetListUser
  );

router.route('/product/get-all-product')
    .get(
        isAdmin.auth(),
        AdminGetListProduct,
        Admin_Controller.adminGetListProduct
    );

export default router;
