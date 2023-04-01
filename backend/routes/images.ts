import express from "express";
import {Image} from "../models/Image";
import authAnonymous from "../middleware/authAnonymous";
import {User} from "../models/User";

const imagesRouter = express.Router();

imagesRouter.get('/', authAnonymous, async (req, res) => {
  const token = req.get('Authorization');

  try {
    if (req.query.imagesUser !== undefined) {
      const user = await User.findOne({token});

      if (user) {
        const images = await Image.find({user: user._id});
        return res.send(images);
      }

    } else {

      const images = await Image.find();
      return res.send(images);

    }

  } catch (e) {
    return res.sendStatus(500);
  }
});

export default imagesRouter