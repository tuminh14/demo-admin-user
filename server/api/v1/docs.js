import swaggerJSDoc from 'swagger-jsdoc';
import { SERVER_PORT } from '../../config';

const swaggerDefinition = {
  info: {
    title: 'Manage User API Docs V1',
    version: '1.0.0',
    description: 'Demo Manage User API Docs V1',
  },
  host: `localhost:${SERVER_PORT}`,
  basePath: '/v1',
  produces: ['application/json'],
  consumes: ['application/json'],
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [{ jwt: [] }],
};

const options = {
  swaggerDefinition,
  apis: [
    'server/api/validatorErrorHandler.js',
    'server/components/*/*.docs.js',
    'server/database/mongo/model/*.model.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

