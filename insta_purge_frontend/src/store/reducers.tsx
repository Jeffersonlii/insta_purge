import * as dashboard from "../pages/dashboard/store/reducers";

import * as signIn from "../pages/signin/store/reducers";
import { combineReducers } from "redux";

export interface defaultState {
  dashboard: dashboard.defaultState;
  signIn: signIn.defaultState;
}

const allReducers = combineReducers({
  dashboard: dashboard.reducer,
  signIn: signIn.reducer,
});
export default allReducers;
