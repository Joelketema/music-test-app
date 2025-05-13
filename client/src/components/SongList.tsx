/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import {
    addSong,
    deleteSong,
    fetchSongs,
    filterByQuery,
    updateSong,
} from "../store/songSlice";
import type { Song } from "../interfaces/Song";
import Loading from "./Loading";

const SongList = () => {
    const dispatch = useDispatch();
    const songs: Song[] = useSelector((state: any) => state.songs.data);
    const loading = useSelector((state: any) => state.songs.loading);
    const success = useSelector((state: any) => state.songs.success);

    const [edit, setEdit] = useState(false);
    const [songToEdit, setSongToEdit] = useState<Song | null>(null);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchSongs());
    }, [dispatch]);

    const handleAddSong = (song: Song) => {
        dispatch(addSong(song));
    };

    const handleEditSong = (song: Song) => {
        dispatch(updateSong(song));
        setEdit(false);
        setSongToEdit(null);
    };

    const handleDeleteSong = (songId: string) => {
        dispatch(deleteSong(songId));
    };

    const handleFilterSongs = () => {
        if (search.trim()) {
            dispatch(filterByQuery(search));
        } else {
            dispatch(fetchSongs());
        }
    };

    return (
        <div css={container}>
            <h2 css={titleStyle}>🎵 Songs</h2>

            <div css={filterBar}>
                <input
                    type="search"
                    placeholder="Search by artist, title, album, or genre"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleFilterSongs();
                        }
                    }}
                    onInput={(e) => {
                        const value = (e.target as HTMLInputElement).value;
                        if (value === "") {
                            setSearch("");
                            dispatch(fetchSongs());
                        }
                    }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    css={input}
                />
                <div>
                    <button
                        onClick={handleFilterSongs}
                        css={button}
                        disabled={!search.trim()}
                    >
                        Search
                    </button>
                    <button
                        onClick={() => {
                            setSearch("");
                            dispatch(fetchSongs());
                        }}
                        css={button}
                        disabled={!search.trim()}
                    >
                        Clear
                    </button>
                    <button
                        css={button}
                        onClick={() => {
                            setEdit(false);
                            setSongToEdit(null);
                            setShowModal(true);
                        }}
                    >
                        Add Song
                    </button>
                </div>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <div css={listContainer}>
                    {songs.length === 0 ? (
                        <div css={noData}>No songs found.</div>
                    ) : (
                        songs.map((s: Song) => (
                            <div key={s._id} css={songCard}>
                                <div>
                                    <span>
                                        <strong>Title:</strong> {s.title}
                                    </span>
                                    <br />
                                    <span>
                                        <strong>Artist:</strong> {s.artist}
                                    </span>
                                    <br />
                                    <span>
                                        <strong>Album:</strong> {s.album}
                                    </span>
                                    <br />
                                    <span>
                                        <strong>Genre:</strong> {s.genre}
                                    </span>
                                </div>
                                <div>
                                    <button
                                        css={button}
                                        onClick={() => {
                                            setEdit(true);
                                            setSongToEdit(s);
                                            setShowModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSong(s._id!)}
                                        css={button}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {showModal && (
                <div css={overlayStyle} onClick={() => setShowModal(false)}>
                    <div css={modalStyle} onClick={(e) => e.stopPropagation()}>
                        <h3>{edit ? "Edit Song" : "Add Song"}</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;
                                const title =
                                    (form.elements[0] as HTMLInputElement)
                                        .value ?? songToEdit?.title;
                                const artist =
                                    (form.elements[1] as HTMLInputElement)
                                        .value ?? songToEdit?.artist;
                                const album =
                                    (form.elements[2] as HTMLInputElement)
                                        .value ?? songToEdit?.album;
                                const genre =
                                    (form.elements[3] as HTMLInputElement)
                                        .value ?? songToEdit?.genre;

                                if (edit && songToEdit) {
                                    handleEditSong({
                                        ...songToEdit,
                                        title,
                                        artist,
                                        genre,
                                        album,
                                    });
                                } else {
                                    // if (!title || !artist || !album || !genre) {
                                    //     toast.error("All fields are required");
                                    //     return;
                                    // }
                                    handleAddSong({
                                        title,
                                        artist,
                                        genre,
                                        album,
                                    });
                                }

                                if (success) {
                                    form.reset();
                                    setShowModal(false);
                                }
                            }}
                            css={formStyle}
                        >
                            <input
                                type="text"
                                placeholder="Title"
                                defaultValue={edit ? songToEdit?.title : ""}
                                css={input}
                            />
                            <input
                                type="text"
                                placeholder="Artist"
                                defaultValue={edit ? songToEdit?.artist : ""}
                                css={input}
                            />
                            <input
                                type="text"
                                placeholder="Album"
                                defaultValue={edit ? songToEdit?.album : ""}
                                css={input}
                            />
                            <input
                                type="text"
                                placeholder="Genre"
                                defaultValue={edit ? songToEdit?.genre : ""}
                                css={input}
                            />

                            <button
                                type="submit"
                                css={button}
                                disabled={loading}
                            >
                                {edit ? "Update" : "Add"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                css={button}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SongList;

const container = css`
    width: 90%;
    font-family: "Segoe UI", sans-serif;
    padding: 1rem;
`;

const titleStyle = css`
    font-size: 32px;
    text-align: center;
    margin-bottom: 24px;
`;

const input = css`
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
`;

const button = css`
    padding: 8px 14px;
    font-size: 14px;
    border-radius: 6px;
    border: none;
    background-color: #6366f1;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #4f46e5;
    }

    &:disabled {
        background-color: #999;
        cursor: not-allowed;
    }

    & + & {
        margin-left: 8px;
    }
`;

const filterBar = css`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;
    align-items: center;
    justify-content: flex-end;

    input {
        width: 20%;
        border-radius: 9999px;
    }

    @media (max-width: 600px) {
        flex-direction: column;
        input {
            width: 100%;
            border-radius: 9999px;
        }
    }

    button {
        flex-shrink: 0;
    }
`;

const listContainer = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 24px;
    margin-top: 30px;
`;

const songCard = css`
    background-color: rgb(239, 255, 255);
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-4px);
    }

    div:first-of-type {
        display: flex;
        flex-direction: column;
        gap: 8px;
        color: #222;
        font-size: 16px;

        span > strong {
            color: #444;
            margin-right: 5px;
        }
    }

    div:last-of-type {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }
`;

const noData = css`
    font-size: 18px;
    text-align: center;

    min-height: 200px;
    text-align: center;
    color: red;
    grid-column: 1 / -1;
    width: 100%;
    padding: 30px;

    @media (max-width: 600px) {
        width: 50%;
    }
`;

const overlayStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.74);
    opacity: 1;
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const modalStyle = css`
    background: #111;
    color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const formStyle = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
