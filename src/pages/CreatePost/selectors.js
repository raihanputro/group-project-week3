import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCreateNewState = (state) => state.createnew || initialState;

export const selectMyPost = createSelector(selectCreateNewState, (state) => state.postData);