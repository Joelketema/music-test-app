import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
    fetchSongs,
    setSongs,
    addSong,
    updateSong,
    deleteSong,
    filterByArtist,
    filterByGenre,
} from "./songSlice";
import { fetchStats, setStats } from "./statSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;

function* fetchSongsSaga() {
    const { data } = yield call(axios.get, baseUrl);
    yield put(setSongs(data));
}

function* addSongSaga(action: any) {
    yield call(axios.post, baseUrl, action.payload);
    yield call(fetchSongsSaga);
    yield put(fetchStats());
}

function* updateSongSaga(action: any) {
    yield call(axios.put, `${baseUrl}/${action.payload._id}`, action.payload);
    yield call(fetchSongsSaga);
    yield put(fetchStats());
}

function* deleteSongSaga(action: any) {
    yield call(axios.delete, `${baseUrl}/${action.payload}`);
    yield call(fetchSongsSaga);
    yield put(fetchStats());
}

function* fetchStatsSaga() {
    const { data } = yield call(axios.get, `${baseUrl}/stats`);
    yield put(setStats(data));
}

function* filterByArtistSaga(action: any) {
    try {
        const { data } = yield call(axios.post, `${baseUrl}/search`, {
            query: action.payload,
        });
        console.log("Artist filter data:", data);
        yield put(setSongs(data));
    } catch (error: any) {
        console.error("Artist filter failed:", error.message);

        yield put(fetchSongs());
    }
}

function* filterByGenreSaga(action: any) {
    const { data } = yield call(axios.post, `${baseUrl}/byGenre`, {
        data: action.payload,
    });
    yield put(setSongs(data));
}

export default function* songsSaga() {
    yield takeEvery(fetchSongs.type, fetchSongsSaga);
    yield takeEvery(addSong.type, addSongSaga);
    yield takeEvery(updateSong.type, updateSongSaga);
    yield takeEvery(deleteSong.type, deleteSongSaga);
    yield takeEvery(fetchStats.type, fetchStatsSaga);
    yield takeEvery(filterByArtist.type, filterByArtistSaga);
    yield takeEvery(filterByGenre.type, filterByGenreSaga);
}
