import { takeLatest, call, put } from 'redux-saga/effects';

import { showPopup, setLoading } from '@containers/App/actions';
import { GET_USER_POSTS, INSERT_NEW_POST } from './constants';
import { createNewPost, getMyPostApi } from '@domain/api';
import { setUserPost } from './actions';

function* doInsertPost({formData, cb}) {
  yield put(setLoading(true));

  try {
    yield call(createNewPost, formData);
    cb();
  } catch (error) {
    yield put(showPopup());
  }

  yield put(setLoading(false));
}
function* getMyPost({userId}) {
  yield put(setLoading(true));

  try {
    const res = yield call(getMyPostApi, userId);
    yield put(setUserPost(res));
  } catch (error) {
    yield put(showPopup());
  }

  yield put(setLoading(false));
}

export default function* createNewSaga() {
  yield takeLatest(INSERT_NEW_POST, doInsertPost);
  yield takeLatest(GET_USER_POSTS, getMyPost);
}
