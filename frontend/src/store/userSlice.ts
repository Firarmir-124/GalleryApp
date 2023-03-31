import {GlobalError, User, ValidationError} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

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
  extraReducers: () => {

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