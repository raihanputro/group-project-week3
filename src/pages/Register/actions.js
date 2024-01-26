import { SET_REGISTER_USER } from "./constants";

export const setRegisterUser = ( dataUser ) => ({
    type: SET_REGISTER_USER,
    dataUser
})