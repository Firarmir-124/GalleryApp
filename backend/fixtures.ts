import mongoose from 'mongoose';
import config from './config';
import * as crypto from "crypto";
import {User} from "./models/User";
import {Image} from "./models/Image";

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;


  try {
    await db.dropCollection('images');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user1, user2, user3] = await User.create(
    {
      email: `admin@mail.com`,
      displayName: 'admin',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      avatar: 'fixtures/avatar.jpg',
    },
    {
      email: `dima@mail.com`,
      displayName: 'dima',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      avatar: 'fixtures/avatar.jpg',
    },
    {
      email: `roma@mail.com`,
      displayName: 'roma',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      avatar: 'fixtures/avatar.jpg',
    }
  );

  await Image.create(
    {
      user: user1._id,
      title: `Картинка админа 1`,
      image: `fixtures/image1.jpg`,
    },
    {
      user: user1._id,
      title: `Картинка админа 2`,
      image: `fixtures/image2.jpg`,
    },
    {
      user: user1._id,
      title: `Картинка админа 3`,
      image: `fixtures/image3.jpg`,
    },

    {
      user: user2._id,
      title: `Картинка Димы 1`,
      image: `fixtures/image1.jpg`,
    },
    {
      user: user2._id,
      title: `Картинка Димы 2`,
      image: `fixtures/image2.jpg`,
    },
    {
      user: user2._id,
      title: `Картинка Димы 3`,
      image: `fixtures/image3.jpg`,
    },

    {
      user: user3._id,
      title: `Картинка Ромы 1`,
      image: `fixtures/image1.jpg`,
    },
    {
      user: user3._id,
      title: `Картинка Ромы 2`,
      image: `fixtures/image2.jpg`,
    },
    {
      user: user3._id,
      title: `Картинка Ромы 3`,
      image: `fixtures/image3.jpg`,
    },
  );

  await db.close();
};

run().catch(console.error);