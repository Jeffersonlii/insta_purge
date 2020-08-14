import * as models from "../dashboard.models";
export const setInstaAccounts = (payload: models.instaAccount[]) => ({
  type: "setInstaAccounts",
  payload: payload,
});
export const getInstaAccounts = () => ({
  type: "getInstaAccounts",
});
