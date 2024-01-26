import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import createNewSaga from '@pages/CreatePost/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    createNewSaga()
  ]);
}
