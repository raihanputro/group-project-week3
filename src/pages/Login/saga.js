import { takeLatest, call, put } from "redux-saga/effects";

import { LoginUser } from "@domain/api";
import { GET_USER_LOGIN, SET_INFO_LOGIN_USER } from "./constants";
import { setInfoLoginUser, setUserLogin } from "./actions";
import { setLoading, showPopup } from "@containers/App/actions";
import { setLogin } from "@containers/Client/actions";

function* doGetDataUser({ dataUser }) {
    yield put(setLoading(true));
    try {
        const res = yield call(LoginUser, dataUser);
        yield put(setUserLogin(res));
    } catch (error) {
        yield put(showPopup());
    }
    yield put(setLoading(false));
};

function* doLogin() {
    yield put(setLoading(true));
        try {
            yield put(setLogin({
                login: true,
            }))
        } catch (error) {
            yield put(showPopup());
        }
}

export default function* loginUserSaga() {
    yield takeLatest(GET_USER_LOGIN, doGetDataUser);
    yield takeLatest(SET_INFO_LOGIN_USER, doLogin);
}
