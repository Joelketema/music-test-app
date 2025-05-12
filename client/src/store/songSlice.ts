import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Song } from "../interfaces/Song";

const songsSlice = createSlice({
    name: "songs",
    initialState: {
        data: [] as Song[],
        loading: false,
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

        filterByArtist: (_state, _action: PayloadAction<string>) => {},
        filterByGenre: (state, action: PayloadAction<string>) => {
            const genre = action.payload;
            state.data = state.data.filter((song) => song.genre === genre);
        },
    },
});

export const {
    fetchSongs,
    setSongs,
    addSong,
    updateSong,
    deleteSong,

    filterByArtist,
    filterByGenre,
} = songsSlice.actions;

export default songsSlice.reducer;
