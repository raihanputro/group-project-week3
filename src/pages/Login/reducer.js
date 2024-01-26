import { produce } from "immer";

import { SET_USER_DATA_LOGIN } from "./constants";

export const initialState = {
    dataUser: [],
};

export const storedKey = [''];

const loginReducer = ( state = initialState, action ) => 
    produce(state, (draft) => {
        switch(action.type) {
            case SET_USER_DATA_LOGIN:
                draft.dataUser = action.data;
                break;
        }
    });

export default loginReducer;