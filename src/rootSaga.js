import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import registerUserSaga from '@pages/Register/saga';
import loginUserSaga from '@pages/Login/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    registerUserSaga(),
    loginUserSaga(),
  ]);
}
