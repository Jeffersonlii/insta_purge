import { logginInfo } from "../Signin.models";
export const tryLoggedIn = (payload: logginInfo) => ({
  type: "tryLoggingIn",
  payload: payload,
});
export const setLoggedIn = (payload: boolean) => ({
  type: "setLoggedIn",
  payload: payload,
});
export const setUserEmail = (payload: string) => ({
  type: "setUserEmail",
  payload: payload,
});
