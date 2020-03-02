import app from './api/index';
import { SERVER_PORT, MONGO_URL } from './config';
import logger from './api/logger';
import {MongoConnect} from './database/mongo/init';
import * as InitFoder from './util/InitFolders';


(async () =>{
  await MongoConnect(MONGO_URL);
  await InitFoder.InitFolder();
})();

app.listen(SERVER_PORT, (error) => {
  if (error) {
    logger.error('Cannot start backend services:');
    logger.error(error);
  } else {
    if(process.env.NODE_ENV === 'development') {
      logger.info(`Server running DEV_ENV.`);
    } else {
      logger.info(`Server running PRODUCTION.`);
    }
    logger.info(`Backend service is running on port: ${SERVER_PORT}${process.env.NODE_APP_INSTANCE ? ` on core ${process.env.NODE_APP_INSTANCE}` : ''}!`);
  }
});

export default app;
