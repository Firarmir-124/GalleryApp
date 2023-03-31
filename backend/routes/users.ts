import express from "express";
import {User} from "../models/User";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import crypto from "crypto";
import config from "../config";
import {OAuth2Client} from "google-auth-library";
import {downloadFile} from "../downloadImage";

const usersRouter = express.Router();

const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password,
      avatar: req.file && req.file.filename
    });

    user.generateToken();
    await user.save();

    return res.send({message: 'Registered successfully!', user})

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
      return res.status(400).send({error: 'Username or password incorrect'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({error: 'Username or password incorrect'});
    }

    user.generateToken()
    await user.save();

    return res.send({message: 'Username and password correct!', user});
  } catch (e) {
    return next(e)
  }
});

usersRouter.post('/google', async (req, res, next) => {
  const nameImage = crypto.randomUUID();

  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({error: 'Wrong Google token !'});
    }

    const email = payload["email"];
    const googleId = payload["sub"];
    const displayName = payload["name"];
    const avatar = payload["picture"];

    if (!email) {
      return res.status(400).send({error: "Not enough user data"})
    }

    let user = await User.findOne({googleId});

    if (!user) {
      await downloadFile(avatar || '', `/${nameImage}.jpg`);

      user = new User({
        email,
        displayName,
        password: crypto.randomUUID(),
        googleId,
        avatar: `imagesGoogle/${nameImage}.jpg`,
      });
    }

    user.generateToken();
    await user.save();
    return res.send({message: 'login with Google successful!', user});
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;