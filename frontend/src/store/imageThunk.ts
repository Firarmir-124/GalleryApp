import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ImagesType} from "../types";

export const getImages = createAsyncThunk<ImagesType[], string>(
  'image/get_images',
  async (query) => {
    const response = await axiosApi.get<ImagesType[]>(query ? '/images?imagesUser=' + query : '/images');
    return response.data;
  }
);