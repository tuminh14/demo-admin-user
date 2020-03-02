/**
 * The config for server
 */

export const SERVER_PORT = process.env.SERVER_PORT || 8001;
export const CORS_OPTIONS = {
  // Find and fill your options here: https://github.com/expressjs/cors#configuration-options
  origin: process.env.SERVER_ORIGIN || '*',
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization,Accept-Language',
};
export const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
export const MONGO_PORT = process.env.MONGO_PORT || 27017;
export const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME || 'demo';
export const MONGO_DATABASE_USERNAME = process.env.MONGO_DATABASE_USERNAME || '';
export const MONGO_DATABASE_PASSWORD = process.env.MONGO_DATABASE_PASSWORD || '';
export const MONGO_URL = (MONGO_DATABASE_USERNAME && MONGO_DATABASE_PASSWORD) ?
  `mongodb://${MONGO_DATABASE_USERNAME}:${MONGO_DATABASE_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}?retryWrites=true`
  :
  `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}?retryWrites=true`;
export const USER_ADMIN = process.env.USER_ADMIN || 'admin';
export const PASS_ADMIN = process.env.PASS_ADMIN || 'admin';

