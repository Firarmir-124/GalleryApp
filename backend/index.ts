import express from 'express';
import * as mongoose from "mongoose";
import cors from 'cors';
import config from "./config";
import usersRouter from "./routes/users";
import imagesRouter from "./routes/images";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/users', usersRouter);
app.use('/photo', imagesRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log('Connect: ', port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
}

run().catch(console.error);