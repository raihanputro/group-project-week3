import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { getAllPost } from '@domain/api';
import { GET_HOME_POST } from './constants';
import { setHomePost } from './actions';

function* doGetPost() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAllPost);
    const finalRes = response.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    yield put(setHomePost(finalRes));
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

export default function* homeSaga() {
  yield takeLatest(GET_HOME_POST, doGetPost);
}
