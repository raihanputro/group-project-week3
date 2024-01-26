import { INSERT_NEW_POST } from "@pages/CreatePost/constants";
import { DELETE_POST_COMMENT, GET_POST_DETAIL_DATA, INSERT_POST_COMMENT, SET_POST_COMMENTS, SET_POST_DETAIL_DATA } from "./constants";

export const getPostDetailData = (id, cbNotFound, cb) => ({
  type: GET_POST_DETAIL_DATA,
  id,
  cbNotFound,
  cb
});

export const setPostDetailData = (data) => ({
  type: SET_POST_DETAIL_DATA,
  data
});

export const setPostComments = (data) => ({
  type: SET_POST_COMMENTS,
  data
})

export const insertComment = (postid, comment, cb) => ({
  type: INSERT_POST_COMMENT,
  postid,
  comment,
  cb
});

export const deleteComment = (id, cb) => ({
  type: DELETE_POST_COMMENT,
  id,
  cb
});