import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "songs",
    initialState: { data: [], loading: false },
    reducers: {
        fetchSongs: () => {},
        setSongs: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchSongs, setSongs } = slice.actions;
export default slice.reducer;
