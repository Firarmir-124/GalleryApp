import {ImagesType, ValidationError} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {createImage, getImages, removeImage} from "./imageThunk";

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
  extraReducers: (builder) => {
    builder.addCase(getImages.pending, (state) => {
      state.getImagesLoading = true;
    });
    builder.addCase(getImages.fulfilled, (state, {payload: images}) => {
      state.getImagesLoading = false;
      state.images = images;
    });
    builder.addCase(getImages.rejected, (state) => {
      state.getImagesLoading = false;
    });

    builder.addCase(createImage.pending, (state) => {
      state.postImageLoading = true;
    });
    builder.addCase(createImage.fulfilled, (state) => {
      state.postImageLoading = false;
    });
    builder.addCase(createImage.rejected, (state, {payload: error}) => {
      state.postImageLoading = false;
      state.errorImage = error || null;
    });

    builder.addCase(removeImage.pending, (state) => {
      state.removeImageLoading = true;
    });
    builder.addCase(removeImage.fulfilled, (state) => {
      state.removeImageLoading = false;
    });
    builder.addCase(removeImage.rejected, (state) => {
      state.removeImageLoading = false;
    });
  }
});

export const imageReducer = imageSlice.reducer;
export const selectImages = (state: RootState) => state.image.images;
export const selectGetImageLoading = (state: RootState) => state.image.getImagesLoading;
export const selectPostImageLoading = (state: RootState) => state.image.postImageLoading;
export const selectImageError= (state: RootState) => state.image.errorImage;
export const selectImageRemoveLoading= (state: RootState) => state.image.removeImageLoading;