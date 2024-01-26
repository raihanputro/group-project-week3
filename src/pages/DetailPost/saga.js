import { takeLatest, call, put } from 'redux-saga/effects';

import { showPopup, setLoading } from '@containers/App/actions';
import { deleteCommentApi, getPostCommentsApi, getPostDetailApi, insertCommentApi } from '@domain/api';
import { setPostComments, setPostDetailData } from './actions';
import { DELETE_POST_COMMENT, GET_POST_DETAIL_DATA, INSERT_POST_COMMENT } from './constants';

function* doGetPostDetailData({id, cbNotFound, cb}) {
  yield put(setLoading(true));

  try {
    const resPostDetail = yield call(getPostDetailApi, id);
    const resCommnets = yield call(getPostCommentsApi, id);
    resCommnets.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    const data = {
      postDetailData: resPostDetail,
      comments: resCommnets
    }

    yield put(setPostDetailData(data));
    if(typeof cb === "function") {
      cb(resPostDetail);
    }
  } catch (error) {
    if(error?.response?.status === 404) {
      cbNotFound();
    } else {
      yield put(showPopup());
    }
  }

  yield put(setLoading(false));
}

function* doInsertComment({postid, comment, cb}) {
  yield put(setLoading(true));

  try {
    yield call(insertCommentApi, comment);
    const res = yield call(getPostCommentsApi, postid);
    res.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    // yield put(setPostComments(res));
    cb(res);
  } catch (error) {
    yield put(showPopup());
  }

  yield put(setLoading(false));
}

function* doDeleteComment({id, cb}) {
  yield put(setLoading(true));

  try {
    yield call(deleteCommentApi, id);
    cb();
  } catch (error) {
    yield put(showPopup());
  }

  yield put(setLoading(false));
}

export default function* postDetailSaga() {
  yield takeLatest(GET_POST_DETAIL_DATA, doGetPostDetailData);
  yield takeLatest(INSERT_POST_COMMENT, doInsertComment);
  yield takeLatest(DELETE_POST_COMMENT, doDeleteComment);
}
