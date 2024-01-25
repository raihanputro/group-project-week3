import { produce } from "immer";

import { SET_REGISTER_USER } from "./constants";

export const initialState = {
    dataUser: {},
};

export const storedKey = ['dataUser'];

const registerReducer = ( state = initialState, action ) =>
    produce( state, (draft) => {
        switch(action.type) {
            case SET_REGISTER_USER:
                draft.dataUser = action.dataUser;
                break;
        };
    });

export default registerReducer;