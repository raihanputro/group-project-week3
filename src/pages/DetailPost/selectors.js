import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPostDetailState = (state) => state.postdetail || initialState;

export const selectPostDetail = createSelector(selectPostDetailState, (state) => state.postDetailData);
export const selectPostComments = createSelector(selectPostDetailState, (state) => state.commentsData);