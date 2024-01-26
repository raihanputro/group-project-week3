import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomeState = (state) => state.home || initialState;

export const selectPost = createSelector(selectHomeState, (state) => state.posts);
