import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Song } from "../interfaces/Song";

const songsSlice = createSlice({
    name: "songs",
    initialState: {
        data: [] as Song[],
        loading: false,
        success: false,
    },
    reducers: {
        fetchSongs: (state) => {
            state.loading = true;
        },
        setSongs: (state, action: PayloadAction<Song[]>) => {
            state.data = action.payload;
            state.loading = false;
        },

        addSong: (_state, _action: PayloadAction<Song>) => {},
        updateSong: (_state, _action: PayloadAction<Song>) => {},
        deleteSong: (_state, _action: PayloadAction<string>) => {},
        filterByQuery: (_state, _action: PayloadAction<string>) => {},
        setSuccess: (state) => {
            state.success = true;
        },
        resetSuccess: (state) => {
            state.success = false;
        },
    },
});

export const {
    fetchSongs,
    setSongs,
    addSong,
    updateSong,
    deleteSong,

    filterByQuery,
    setSuccess,
    resetSuccess,
} = songsSlice.actions;

export default songsSlice.reducer;
