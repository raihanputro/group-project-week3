import { EDIT_POST_DATA, GET_USER_POSTS, INSERT_NEW_POST, SET_USER_POSTS } from "./constants";

export const insertNewPost = (formData, cb) => ({
  type: INSERT_NEW_POST,
  formData,
  cb
});

export const getUserPost = (userId) => ({
  type: GET_USER_POSTS,
  userId
});

export const setUserPost = (data) => ({
  type: SET_USER_POSTS,
  data
});

export const editPostData = (id, data, cb) => ({
  type: EDIT_POST_DATA,
  id,
  data,
  cb
})