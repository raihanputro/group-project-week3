import { SET_USER_DATA_LOGIN, GET_USER_DATA_LOGIN, SET_INFO_LOGIN_USER } from "./constants";

export const getUserDataLogin = () => ({
    type: GET_USER_DATA_LOGIN,
});

export const setUserDataLogin = ( data ) => ({
    type: SET_USER_DATA_LOGIN,
    data
});

export const setInfoLoginUser = ( infoData ) => ({
    type: SET_INFO_LOGIN_USER,
    infoData
  });
  