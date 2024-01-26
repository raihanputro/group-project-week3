import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import homeSaga from '@pages/Home/saga';
import registerUserSaga from '@pages/Register/saga';
import loginUserSaga from '@pages/Login/saga';
import createNewSaga from '@pages/CreatePost/saga';

export default function* rootSaga() {
  yield all([appSaga(), homeSaga(), registerUserSaga(), loginUserSaga(), createNewSaga()]);
}
