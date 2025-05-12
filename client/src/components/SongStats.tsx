import { useEffect } from "react";
import type { Stats } from "../interfaces/Song";
import { useDispatch, useSelector } from "react-redux";

import { fetchStats } from "../store/statSlice";

const SongStat = () => {
    const dispatch = useDispatch();
    const stats: Stats = useSelector((state: any) => state.stats.data);

    useEffect(() => {
        dispatch(fetchStats());
    }, [dispatch]);

    console.log("stats", stats);

    return (
        <div style={{ padding: "20px", marginTop: "20px" }}>
            <h2>Stats</h2>

            <ul>
                <li>Total Songs: {stats.totalSongs}</li>
                <li>Total Artists: {stats.totalArtists}</li>
                <li>Total Albums: {stats.totalAlbums}</li>
                <li>Total Genres: {stats.totalGenres}</li>
                <li>Popular Artist: {stats.popularArtist}</li>
            </ul>
        </div>
    );
};

export default SongStat;
