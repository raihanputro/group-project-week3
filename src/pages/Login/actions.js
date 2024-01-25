import { SET_USER_LOGIN, GET_USER_LOGIN, SET_INFO_LOGIN_USER } from "./constants";

export const getUserLogin = () => ({
    type: GET_USER_LOGIN,
});

export const setUserLogin = ( data ) => ({
    type: SET_USER_LOGIN,
    data
});

export const setInfoLoginUser = ( infoData ) => ({
    type: SET_INFO_LOGIN_USER,
    infoData
  });
  