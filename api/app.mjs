import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import appRouter from './router.mjs';
import { MONGODB_URI, API_ENV, API_PORT } from './secrets.mjs';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', API_PORT);
app.use('/api/', appRouter);

if (API_ENV === 'production') {
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
    app.listen(app.get('port'), () => {
      console.log(
        `App is running at http://localhost:${app.get('port')} `
        + `in ${API_ENV} mode\nPress CTRL-C to stop`
      );
    });
  })
  .catch((err) => {
    console.log(`MongoDB connection error: ${err}`);
  });
