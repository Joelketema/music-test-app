import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { fetchSongs, setSongs } from "./songSlice";

function* fetchSongsSaga() {
    const { data } = yield call(axios.get, "http://localhost:3000/api/v1/song");
    yield put(setSongs(data));
}

export default function* rootSaga() {
    yield takeEvery(fetchSongs.type, fetchSongsSaga);
}
