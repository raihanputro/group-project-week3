import { produce } from 'immer';

import { SET_POST } from './constants';

export const initialState = {
  posts: [],
};

export const storedKey = ['home'];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_POST:
        draft.posts = action.posts;
        break;
    }
  });

export default homeReducer;
