import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const statsSlice = createSlice({
    name: "stats",
    initialState: {
        data: {
            totalSongs: 0,
            totalArtists: 0,
            totalAlbums: 0,
            totalGenres: 0,
            popularArtist: "",
            numberOfAlbumsPerArtist: 0,
            numberOfSongsInEachGenre: 0,
            songsInEachAlbum: 0,
            songsOfEachArtist: 0,
            songsInEachGenre: 0,
        },
        loading: false,
    },
    reducers: {
        fetchStats: (state) => {
            state.loading = true;
        },
        setStats: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
            state.loading = false;
        },
    },
});
export const { fetchStats, setStats } = statsSlice.actions;
export default statsSlice.reducer;
