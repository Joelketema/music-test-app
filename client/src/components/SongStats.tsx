/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { css } from "@emotion/react";
import type { Stats } from "../interfaces/Song";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../store/statSlice";
import Loading from "./Loading";

const SongStat = () => {
    const dispatch = useDispatch();
    const stats: Stats = useSelector((state: any) => state.stats.data);
    const loading: boolean = useSelector((state: any) => state.stats.loading);

    useEffect(() => {
        dispatch(fetchStats());
    }, [dispatch]);

    return (
        <div css={container}>
            <h2 css={title}>🎧 Song Stats</h2>
            {loading ? (
                <Loading />
            ) : (
                <div css={grid}>
                    <StatCard
                        label="Total Songs"
                        value={stats.totalSongs || 0}
                    />
                    <StatCard
                        label="Total Artists"
                        value={stats.totalArtists || 0}
                    />
                    <StatCard
                        label="Total Albums"
                        value={stats.totalAlbums || 0}
                    />
                    <StatCard
                        label="Total Genres"
                        value={stats.totalGenres || 0}
                    />
                    <StatCard
                        label="Popular Artist"
                        value={stats.popularArtist || "N/A"}
                    />
                    <StatCard
                        label="Popular Genre"
                        value={stats.popularGenre || "N/A"}
                    />
                    <StatCard
                        label="Number of Albums per Artist"
                        value={stats.numberOfAlbumsPerArtist || 0}
                    />
                    <StatCard
                        label="Number of Songs in Each Genre"
                        value={stats.numberOfSongsInEachGenre || 0}
                    />

                    <StatCard
                        label="Songs of Each Artist"
                        value={stats.songsOfEachArtist || 0}
                    />
                </div>
            )}
        </div>
    );
};

const StatCard = ({
    label,
    value,
}: {
    label: string;
    value: string | number | Record<string, number>;
}) => (
    <div css={card}>
        <p css={statLabel}>{label}</p>
        {typeof value === "object" ? (
            <ul css={listStyle}>
                {Object.entries(value).map(([key, val]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {val}
                    </li>
                ))}
            </ul>
        ) : (
            <p css={statValue}>
                {value
                    .toString()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
            </p>
        )}
    </div>
);

const listStyle = css`
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0;
    font-size: 14px;

    li {
        margin-bottom: 4px;
        color: #444;
    }

    strong {
        color: #000;
    }
`;

const container = css`
    padding: 20px;
    overflow: hidden;

    width: 90%;
`;

const title = css`
    text-align: center;
    font-size: 28px;
    margin-bottom: 24px;
`;

const grid = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
`;

const card = css`
    background-color: rgb(239, 255, 255);
    border-radius: 10px;
    padding: 16px;
    text-align: left;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease-in-out;

    &:hover {
        background: #e9e9e9;
    }
`;

const statLabel = css`
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
`;

const statValue = css`
    font-size: 22px;
    font-weight: bold;
    color: #333;
`;

export default SongStat;
