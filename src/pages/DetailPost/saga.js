import { takeLatest, call, put } from 'redux-saga/effects';

import { showPopup, setLoading } from '@containers/App/actions';
import { getPostCommentsApi, getPostDetailApi } from '@domain/api';
import { setPostDetailData } from './actions';
import { GET_POST_DETAIL_DATA } from './constants';

function* doGetPostDetailData({id}) {
  yield put(setLoading(true));

  try {
    const resPostDetail = yield call(getPostDetailApi, id);
    const resCommnets = yield call(getPostCommentsApi, id);
    const data = {
      postDetailData: resPostDetail?.data,
      comments: resCommnets?.data
    }
    yield put(setPostDetailData(data));
  } catch (error) {
    yield put(showPopup());
  }

  yield put(setLoading(false));
}

export default function* postDetailSaga() {
  yield takeLatest(GET_POST_DETAIL_DATA, doGetPostDetailData);
}
