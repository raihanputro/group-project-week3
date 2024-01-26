import { INSERT_NEW_POST } from "@pages/CreatePost/constants";
import { GET_POST_DETAIL_DATA, SET_POST_DETAIL_DATA } from "./constants";

export const getPostDetailData = (id) => ({
  type: GET_POST_DETAIL_DATA,
  id
});

export const setPostDetailData = (data) => ({
  type: SET_POST_DETAIL_DATA,
  data
});

export const insertComment = (comment) => ({
  type: INSERT_NEW_POST,
  comment
});