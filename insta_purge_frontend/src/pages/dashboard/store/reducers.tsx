import * as models from "../dashboard.models";

export interface defaultState {
  instaAccounts: models.instaAccount[];
}

const defaultState: defaultState = {
  instaAccounts: [],
};
export const reducer = (
  state = defaultState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "setInstaAccounts":
      return { ...state, instaAccounts: action.payload };
    default:
      return state;
  }
};

export default reducer;
