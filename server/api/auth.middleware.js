import jwt from 'jsonwebtoken';
import APIError from '../util/APIError';
import { JWT_SECRET_KEY } from '../config';

/**
 * Check user Authorization
 * @returns {Function}
 */
export async function isAuthorized(req, res, next) {
  const authorization = req.header('Authorization');
  if (typeof authorization !== 'string') {
    return next(new APIError(401, 'Unauthorized'));
  }
  const authorizationArray = authorization.split(' ');
  if (authorizationArray[0] === 'Bearer') {
    const token = authorizationArray[1];
    let userData;
    try {
      userData = jwt.verify(token, JWT_SECRET_KEY);
      if (!userData) {
        return next(new APIError(401, 'Unauthorized'));
      }
    } catch (error) {
      return next(new APIError(401, 'Unauthorized'));
    }
    try {
      const user = await User.findById(userData._id);
      if (!user) {
        return next(new APIError(401, 'Unauthorized'));
      }
      req.auth = user;
    } catch (error) {
      return next(new APIError(401, 'Unauthorized'));
    }
    return next();
  }
  return next(new APIError(401, 'Unauthorized'));
}
