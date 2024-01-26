import { GET_POST, SET_POST } from './constants';

export const setPost = (posts) => ({
  type: SET_POST,
  posts,
});

export const getPost = () => ({
  type: GET_POST,
});
