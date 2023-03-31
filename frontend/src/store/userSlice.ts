import {GlobalError, User, ValidationError} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {googleLogin, login, logout, register} from "./userThunk";

interface UserType {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  logoutLoading: boolean;
}

const initialState: UserType = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  logoutLoading: false,
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null
    });
    builder.addCase(register.fulfilled, (state, {payload: user}) => {
      state.registerLoading = false;
      state.user = user
    });
    builder.addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null
    });
    builder.addCase(login.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user
    });
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null
    });
    builder.addCase(googleLogin.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user
    });
    builder.addCase(googleLogin.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null
    });

    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutLoading = false;
    });
  }
});

export const userReducer = userSlice.reducer;
export const {unsetUser} = userSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLogoutLoading = (state: RootState) => state.users.logoutLoading;