import { produce } from 'immer';
import { SET_POST_DETAIL_DATA } from './constants';

export const initialState = {
  postDetailData: {},
  commentsData: []
};

export const storedKey = [];

const createnewReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_POST_DETAIL_DATA:
        draft.postDetailData = action?.data?.postDetailData;
        draft.commentsData = action?.data?.comments;
        break;
    }
  });

export default createnewReducer;
