import mongoose from 'mongoose';
import logger from "../../../api/logger";
import dummySomeData from "./dummySomeData";
mongoose.Promise = Promise;

async function MongoConnect(dbUrl) {
  try {
    if (!dbUrl) throw new Error('No database info provided');

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    logger.info('Mongodb connected');
    dummySomeData().catch((error) => {
      console.error('dummySomeData error');
      console.error(error);
    });
  } catch (err) {
    logger.error('Please make sure Mongodb is installed and running!');
    throw err;
  }
}

function MongoDisconnect (db) {
  db.disconnect();
}

module.exports = {
  MongoConnect,
  MongoDisconnect
};
