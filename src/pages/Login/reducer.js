import { produce } from "immer";

import { SET_USER_LOGIN, SET_INFO_LOGIN_USER } from "./constants";

export const initialState = {
    dataUser: [],
    infoLoginUser: null
};

export const storedKey = ['infoLoginUser'];

const loginReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_USER_LOGIN:
                draft.dataUser = action.data;
                break;
            case SET_INFO_LOGIN_USER:
                draft.infoLoginUser = action.infoData;
                break;
        }
    });

export default loginReducer;