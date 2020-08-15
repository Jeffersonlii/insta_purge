export interface defaultState {
  isLoggedIn: boolean;
  userEmail: string | undefined;
  authToken: string | undefined;
}

const defaultState: defaultState = {
  isLoggedIn: false,
  userEmail: undefined,
  authToken: undefined,
};
export const reducer = (
  state = defaultState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "setLoggedIn":
      return { ...state, isLoggedIn: action.payload };
    case "setUserEmail":
      return { ...state, userEmail: action.payload };
    case "setAuthToken":
      return { ...state, authToken: action.payload };
    default:
      return state;
  }
};

export default reducer;
