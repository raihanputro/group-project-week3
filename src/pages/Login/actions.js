import { SET_USER_DATA_LOGIN, GET_USER_DATA_LOGIN } from "./constants";

export const getUserDataLogin = () => ({
    type: GET_USER_DATA_LOGIN,
});

export const setUserDataLogin = ( data ) => ({
    type: SET_USER_DATA_LOGIN,
    data
});
  