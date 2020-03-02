import {JWT, CreateAuth} from "@k-will/core-authencation";
import UserModel from '../../database/mongo/model/user.model';
import AdminModel from '../../database/mongo/model/admin.model';
import {ADMIN_ROLE} from "../../constants";

export const jwt = new JWT({
  jwtKey: 'abc',
  expiredTime: 2592000000
});
/**
 * JWT User
 * */
export const isUser = new CreateAuth('user', jwt.getJWTKey(), 'jwt', async (token, done) => {
  try {
    let user = await UserModel.findById(token._id).lean();
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e);
  }
});

/**
 * JWT Admin
 * */
export const isAdmin = new CreateAuth('admin', jwt.getJWTKey(), 'jwt', async (token, done) => {
  try {
    let admin = await AdminModel.findOne({_id: token._id, role: { $in: Object.values(ADMIN_ROLE) }}).lean();
    if (!admin) {
      return done(null, false);
    }
    return done(null, admin);
  } catch (error) {
    return done(error)
  }
});


