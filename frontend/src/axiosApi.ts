import axios, {AxiosHeaders, AxiosRequestConfig} from "axios";
import {apiURl} from "./constans";
import {Store} from "@reduxjs/toolkit";
import {RootState} from "./app/store";

const axiosApi = axios.create({
  baseURL: apiURl
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);

    return config;
  });
};

export default axiosApi;