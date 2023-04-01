import {ImagesType, ValidationError} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

interface ImageType {
  images: ImagesType[];
  getImagesLoading: boolean;
  postImageLoading: boolean;
  errorImage: ValidationError | null;
  removeImageLoading: boolean;
}

const initialState: ImageType = {
  images: [],
  getImagesLoading: false,
  postImageLoading: false,
  errorImage: null,
  removeImageLoading: false,
}

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},
  extraReducers: () => {

  }
});

export const imageReducer = imageSlice.reducer;
export const selectImages = (state: RootState) => state.image.images;
export const selectGetImageLoading = (state: RootState) => state.image.getImagesLoading;
export const selectPostImageLoading = (state: RootState) => state.image.postImageLoading;
export const selectImageError= (state: RootState) => state.image.errorImage;
export const selectImageRemoveLoading= (state: RootState) => state.image.removeImageLoading;