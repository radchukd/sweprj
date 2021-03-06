import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import appRouter from './router.mjs';
import { MONGODB_URI } from './secrets.mjs';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/', appRouter);

if (process.env.NODE_ENV === 'production') {
  const dirname = path.resolve();
  app.use(express.static(path.resolve(dirname, 'build')));

  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(dirname, 'build/index.html'));
  });
}

const mongoOpts = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose.connect(MONGODB_URI, mongoOpts)
  .then(() => {
    console.log('MongoDB is connected');
    app.listen(process.env.PORT || 5000, () => console.log('OK\n'));
  })
  .catch((err) => {
    console.log(`MongoDB connection error: ${err}`);
  });
