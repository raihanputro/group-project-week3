import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { getAllPost } from '@domain/api';
import { GET_POST } from './constants';

function* doGetPost() {
  yield put(setLoading(true));
  try {
    const { data } = yield call(getAllPost);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  yield put(setLoading(false));
}

export default function* homeSaga() {
  yield takeLatest(GET_POST, doGetPost);
}
