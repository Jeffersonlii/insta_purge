export interface defaultState {
  isLoggedIn: boolean;
  userEmail: string | undefined;
}

const defaultState: defaultState = {
  isLoggedIn: false,
  userEmail: undefined,
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
    default:
      return state;
  }
};

export default reducer;
