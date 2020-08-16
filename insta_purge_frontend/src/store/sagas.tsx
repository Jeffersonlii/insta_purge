import { all } from "redux-saga/effects";
import * as singin from "../pages/signin/store/sagas";
import * as dashboard from "../pages/dashboard/store/sagas";

export default function* rootSaga() {
  yield all([
    singin.tryLogIn(),
    dashboard.getInstaAccounts$(),
    dashboard.addInstaAccounts$(),
    dashboard.deleteInstaAccounts$(),
  ]);
}
