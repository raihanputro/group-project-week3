import { produce } from 'immer';
import { SET_USER_POSTS } from './constants';

export const initialState = {
  postData: []
};

export const storedKey = [];

const createnewReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_USER_POSTS:
        draft.postData = action.data;
        break;
    }
  });

export default createnewReducer;
