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

  const userAdmin = await User.create(
    {
      email: `admin@mail.com`,
      displayName: 'admin',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      avatar: 'fixtures/avatar.jpg',
    }
  );

  await Image.create({
    user: userAdmin._id,
    title: `Картинка админа`,
    image: `fixtures/image1.jpg`,
  });

  for (let i = 1; i < 3; i++) {
    const user = await User.create(
      {
        email: `user${i}@mail.com`,
        displayName: `user${i}`,
        password: '123',
        token: crypto.randomUUID(),
        role: 'user',
        avatar: 'fixtures/avatar.jpg',
      }
    );

    for (let j = 1; j < 5; j++) {
      await Image.create({
        user: user._id,
        title: `Картинка${j}`,
        image: `fixtures/image${j}.jpg`,
      });
    }
  }

  await db.close();
};

run().catch(console.error);