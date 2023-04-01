import {model, Schema, Types} from "mongoose";
import {ImageType} from "../types";
import {User} from "./User";

const ImageSchema = new Schema<ImageType>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: (value: Types.ObjectId) => User.findById(value),
      message: 'user is not found !',
    }
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const Image = model('Image', ImageSchema);