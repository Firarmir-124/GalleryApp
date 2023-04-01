import express from "express";
import {Image} from "../models/Image";
import {User} from "../models/User";
import auth from "../middleware/auth";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";

const imagesRouter = express.Router();

imagesRouter.get('/', async (req, res) => {
  try {
    if (req.query.imagesUser !== undefined) {
      const images = await Image.find({user: req.query.imagesUser});
      return res.send(images);
    } else {
      const images = await Image.find();
      return res.send(images);
    }

  } catch (e) {
    return res.sendStatus(500);
  }
});

imagesRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const token = req.get('Authorization');

  try {
    const user = await User.findOne({token});

    const createImage = await Image.create({
      user: user && user._id,
      title: req.body.title,
      image: req.file && req.file.filename,
    });

    return res.send(createImage);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default imagesRouter