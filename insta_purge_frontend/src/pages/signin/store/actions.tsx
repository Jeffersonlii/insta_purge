import { logginInfo } from "../Signin.models";
export const setLoggedIn = (payload: boolean) => ({
  type: "setLoggedIn",
  payload: payload,
});
export const setUserEmail = (payload: string) => ({
  type: "setUserEmail",
  payload: payload,
});

export const setAuthToken = (payload: string) => ({
  type: "setAuthToken",
  payload: payload,
});
