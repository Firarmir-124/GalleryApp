import {createAsyncThunk} from "@reduxjs/toolkit";
import {RegisterMutation, RegisterResponse, User, ValidationError} from "../types";
import axiosApi from "../axiosApi";
import {isAxiosError} from "axios";

export const register = createAsyncThunk<User, RegisterMutation, {rejectValue: ValidationError}>(
  'users/register',
  async (registerMutation, {rejectWithValue}) => {
    const formData = new FormData();
    const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[]

    keys.forEach((key) => {
      const value = registerMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const response = await axiosApi.post<RegisterResponse>('/users', formData);
      return response.data.user
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);