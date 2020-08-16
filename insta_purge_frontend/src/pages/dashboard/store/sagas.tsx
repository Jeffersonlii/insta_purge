import { takeLatest, put, call } from "redux-saga/effects";
import { authenticatedAxios } from "../../../http/axios-interceptors";
import {
  get_insta_accounts,
  add_insta_accounts,
} from "../../../http/api.models";
import { setInstaAccounts, getInstaAccounts } from "./actions";

export function* getInstaAccounts$() {
  yield takeLatest("getInstaAccounts", function* (payload) {
    const accounts = yield call(() => {
      return authenticatedAxios().get(get_insta_accounts);
    });
    if (accounts.status === 200) {
      yield put(
        setInstaAccounts(
          accounts.data.map((a: any) => ({
            id: a.id,
            userName: a.instagram_user_name,
            password: a.instagram_password,
          }))
        )
      );
    }
  });
}

export function* addInstaAccounts$() {
  yield takeLatest("addInstaAccounts", function* (payload: any) {
    const accounts = yield call(() => {
      return authenticatedAxios().post(add_insta_accounts, payload.payload);
    });
    if (accounts.status === 200) {
      yield put(getInstaAccounts());
    }
  });
}
