import { Express } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logEvents } from '../middleware/logger';

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || '';

const connectServer = async (app: Express) => {
  try {
    mongoose.connection.once('open', () => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`);
      });
    });

    mongoose.connection.on('error', (err: any) => {
      console.log(err);
      logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        'mongoErrLog.log'
      );
    });

    await mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.log(err);
  }
};

export default connectServer;
