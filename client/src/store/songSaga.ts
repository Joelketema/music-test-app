import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
    fetchSongs,
    setSongs,
    addSong,
    updateSong,
    deleteSong,
    filterByQuery,
    setSuccess,
} from "./songSlice";
import { fetchStats, setStats } from "./statSlice";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_BASE_URL;

function* fetchSongsSaga() {
    try {
        const { data } = yield call(axios.get, baseUrl);
        yield put(setSongs(data));
    } catch (error) {
        console.error("Fetch songs failed:", error);
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("An unknown error occurred");
        }
    }
}

function* addSongSaga(action: any) {
    try {
        yield call(axios.post, baseUrl, action.payload);
        yield call(fetchSongsSaga);
        yield put(fetchStats());
        yield put(setSuccess());
        toast.success("Song added successfully");
    } catch (error) {
        if (error instanceof Error) {
            toast.error((error as any)?.response?.data?.message);
        } else {
            toast.error("An unknown error occurred");
        }
    }
}

function* updateSongSaga(action: any) {
    try {
        yield call(
            axios.put,
            `${baseUrl}/${action.payload._id}`,
            action.payload
        );
        yield call(fetchSongsSaga);
        yield put(fetchStats());
        yield put(setSuccess());
        toast.success("Song updated successfully");
    } catch (error) {
        console.error("Update song failed:", error);
        if (error instanceof Error) {
            toast.error((error as any)?.response?.data?.message);
        } else {
            toast.error("An unknown error occurred");
        }
    }
}

function* deleteSongSaga(action: any) {
    try {
        yield call(axios.delete, `${baseUrl}/${action.payload}`);
        yield call(fetchSongsSaga);
        yield put(fetchStats());
        toast.success("Song deleted successfully");
    } catch (error) {
        console.error("Delete song failed:", error);
        if (error instanceof Error) {
            toast.error((error as any)?.response?.data?.message);
        } else {
            toast.error("An unknown error occurred");
        }
    }
}

function* fetchStatsSaga() {
    try {
        const { data } = yield call(axios.get, `${baseUrl}/stats`);
        yield put(setStats(data));
    } catch (error) {
        console.error("Failed to fetch stats:", error);
        yield put(setStats({}));
    }
}

function* filterByQuerySaga(action: any) {
    try {
        const { data } = yield call(axios.post, `${baseUrl}/search`, {
            query: action.payload,
        });

        yield put(setSongs(data));
    } catch (error: any) {
        console.error("Artist filter failed:", error.message);

        yield put(fetchSongs());
    }
}

export default function* songsSaga() {
    yield takeEvery(fetchSongs.type, fetchSongsSaga);
    yield takeEvery(addSong.type, addSongSaga);
    yield takeEvery(updateSong.type, updateSongSaga);
    yield takeEvery(deleteSong.type, deleteSongSaga);
    yield takeEvery(fetchStats.type, fetchStatsSaga);
    yield takeEvery(filterByQuery.type, filterByQuerySaga);
}
