import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songsReducer from "./songSlice";
import statsReducer from "./statSlice";
import rootSaga from "./songSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        songs: songsReducer,
        stats: statsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
