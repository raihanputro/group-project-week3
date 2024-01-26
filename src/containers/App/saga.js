import { takeLatest, call, put } from 'redux-saga/effects';

import { deletePostApi, ping } from '@domain/api';
import { showPopup, setLoading } from '@containers/App/actions';
import { DELETE_POST, DO_LOGIN, PING } from '@containers/App/constants';
import { setInfoLoginUser, setLogin } from "@containers/Client/actions";

function* doPing() {
  yield put(setLoading(true));
  try {
    yield call(ping);
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doLogin({ userData }) {
  yield put(setLoading(true));
      try {
          yield put(setLogin(true));
          yield put(setInfoLoginUser(userData));
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
  yield takeLatest(DO_LOGIN, doLogin);
  yield takeLatest(DELETE_POST, doDeletePost);
}
