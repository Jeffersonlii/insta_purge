import { takeLatest, put, delay } from "redux-saga/effects";

export function* tryLogIn() {
  yield takeLatest("tryLoggingIn", function* (payload) {
    yield delay(1000);
    yield put({
      type: "isLoggedIn",
      payload: true,
    });
  });
}
