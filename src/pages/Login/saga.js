import { takeLatest, call, put } from "redux-saga/effects";
import { LoginUser } from "@domain/api";
import { GET_USER_DATA_LOGIN } from "./constants";
import { setUserDataLogin } from "./actions";
import { setLoading, showPopup } from "@containers/App/actions";

function* doGetDataUser({ dataUser }) {
    yield put(setLoading(true));
    try {
        const res = yield call(LoginUser, dataUser);
        yield put(setUserDataLogin(res));
    } catch (error) {
        yield put(showPopup());
    }
    yield put(setLoading(false));
};

export default function* loginUserSaga() {
    yield takeLatest(GET_USER_DATA_LOGIN, doGetDataUser);
};
