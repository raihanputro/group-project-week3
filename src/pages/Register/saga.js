import { takeLatest, call, put } from "redux-saga/effects";

import { RegisterUser } from "@domain/api";
import { SET_REGISTER_USER } from "./constants";
import { setLoading, showPopup } from "@containers/App/actions";

function* doRegister({ dataUser }) {
    yield put(setLoading(true));
    try {
        yield call(RegisterUser, dataUser);
    } catch (error) {
        yield put(showPopup());
    }
    yield put(setLoading(false));
};

export default function* registerUserSaga() {
    yield takeLatest(SET_REGISTER_USER, doRegister);
}