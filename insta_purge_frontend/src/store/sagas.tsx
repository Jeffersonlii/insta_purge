import { all } from "redux-saga/effects";
import * as singin from "../pages/signin/store/sagas";

export default function* rootSaga() {
  yield all([singin.tryLogIn()]);
}
