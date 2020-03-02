import path from 'path';
import Express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import { CORS_OPTIONS } from '../config';
import { MORGAN_FORMAT } from '../constants';
import errorHandler from './errorHandler';
import routeV1 from './v1';
import swaggerSpec from './v1/docs';
import ResponseHandler from '../util/handleReponse';

const app = new Express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan(MORGAN_FORMAT, {
    skip: (req, res) => {
      if (req.originalUrl.includes('api-docs')) {
        return true;
      }
      return res.statusCode < 400;
    },
    stream: process.stderr,
  }));
  app.use(morgan(MORGAN_FORMAT, {
    skip: (req,
res) => {
      if (req.originalUrl.includes('api-docs')) {
        return true;
      }
      return res.statusCode >= 40
0;
    },
    stream: process.stdout,
  }));
} else {
  app.use(morgan(MORGAN_FORMAT, {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stderr,
  }));
  app.use(morgan(MORGAN_FORMAT, {
    skip: (req, res) => res.statusCode >= 400,
    stream: process.stdout,
  }));
}
// Note: All request handle use CORS must be write bellow CORS settings
app.use(cors(CORS_OPTIONS));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use((req, res, next) => {
  res.RH = new ResponseHandler(res);
  req.headers.lang = req.headers.lang || 'en';
  next()
});

app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use('/v1', routeV1);

app.use(errorHandler);

export default app;
