import { SET_LOGIN, SET_TOKEN, SET_USER_DATA, SET_INFO_LOGIN_USER } from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setUserData = (data) => ({
  type: SET_USER_DATA,
  data
});

export const setInfoLoginUser = (infoData) => ({
  type: SET_INFO_LOGIN_USER,
  infoData
});