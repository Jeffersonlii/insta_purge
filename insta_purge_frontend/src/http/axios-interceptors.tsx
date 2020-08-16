import axios, { AxiosResponse } from "axios";
import { store } from "../index";
import { api_url } from "./api.models";
export const authenticatedAxios = () => {
  const defaultOptions = {
    baseURL: api_url,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    let token = store.getState().signIn.authToken;
    if (!token) {
      token = localStorage["token"];
    }
    config.headers.Authorization = token ? token : "";
    return config;
  });
  return instance;
};

export const unauthenticatedAxios = () => {
  const defaultOptions = {
    baseURL: api_url,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.create(defaultOptions);
};
