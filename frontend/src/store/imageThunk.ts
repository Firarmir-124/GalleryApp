import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ImagesMutation, ImagesType, ValidationError} from "../types";
import {isAxiosError} from "axios";

export const getImages = createAsyncThunk<ImagesType[], string>(
  'image/get_images',
  async (query) => {
    const response = await axiosApi.get<ImagesType[]>(query ? '/images?imagesUser=' + query : '/images');
    return response.data;
  }
);

export const createImage = createAsyncThunk<void, ImagesMutation, {rejectValue: ValidationError}>(
  'image/create_image',
  async (imagesMutation, {rejectWithValue}) => {
    const formData = new FormData();
    const keys = Object.keys(imagesMutation) as (keyof ImagesMutation)[];

    keys.forEach((id) => {
      const value = imagesMutation[id];

      if (value !== null) {
        formData.append(id, value);
      }
    });

    try {
      await axiosApi.post<ImagesMutation>('/images', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
    }
  }
);

export const removeImage = createAsyncThunk<void, string>(
  'image/remove_image',
  async (id) => {
    await axiosApi.delete('/images/' + id);
  }
);