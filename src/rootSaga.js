import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import registerUserSaga from '@pages/Register/saga';
import loginUserSaga from '@pages/Login/saga';
import createNewSaga from '@pages/CreatePost/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    registerUserSaga(),
    loginUserSaga(),
    createNewSaga()
  ]);
}
