import { GET_HOME_POST, SET_HOME_POST } from './constants';

export const setHomePost = (posts) => ({
  type: SET_HOME_POST,
  posts,
});

export const getHomePost = () => ({
  type: GET_HOME_POST,
});
