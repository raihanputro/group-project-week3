import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectLoginState = (state) => state.login || initialState;

export const selectUserLogin = createSelector(selectLoginState, (state) => state.dataUser);
