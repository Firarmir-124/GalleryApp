import * as Mongoose from "mongoose";

export interface IUser {
  email: string;
  displayName: string;
  password: string;
  token: string;
  role: string;
  googleId?: string;
  avatar: File | string;
}

export interface ImageType {
  user: Mongoose.Types.ObjectId;
  title: string;
  image: string;
}