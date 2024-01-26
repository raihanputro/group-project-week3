import { takeLatest, call, put } from 'redux-saga/effects';

import { deletePostApi, ping } from '@domain/api';
import { showPopup, setLoading } from '@containers/App/actions';
import { DELETE_POST, PING } from '@containers/App/constants';

function* doPing() {
  yield put(setLoading(true));
  try {
    yield call(ping);
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doDeletePost({id, cb}) {
  yield put(setLoading(false));
  try {
    yield call(deletePostApi, id);
    cb();
  } catch (error) {
    yield put(showPopup("error", error.message));
  }
  yield put(setLoading(false));
}

export default function* appSaga() {
  yield takeLatest(PING, doPing);
  yield takeLatest(DELETE_POST, doDeletePost);
}
