import express from "express";
import {User} from "../models/User";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";

const usersRouter = express.Router();

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

export default usersRouter;