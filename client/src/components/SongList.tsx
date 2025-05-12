import React, { useEffect, useState } from "react";
import type { Song } from "../interfaces/Song";
import { useDispatch, useSelector } from "react-redux";
import {
    addSong,
    deleteSong,
    fetchSongs,
    filterByArtist,
    updateSong,
} from "../store/songSlice";

const SongList = () => {
    const dispatch = useDispatch();
    const songs: Song[] = useSelector((state: any) => state.songs.data);
    const [edit, setEdit] = useState<boolean | null>(false);
    const [songToEdit, setSongToEdit] = useState<Song | null>(null);
    const [search, setSearch] = useState<string>("");

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
        console.log("search", search);
        if (search) {
            dispatch(filterByArtist(search));
        } else {
            dispatch(fetchSongs());
        }
    };

    console.log("songs", songs);

    return (
        <div>
            <h2>Songs</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const title = (form.elements[0] as HTMLInputElement).value;
                    const artist = (form.elements[1] as HTMLInputElement).value;
                    const genre = (form.elements[2] as HTMLInputElement).value;
                    const album = (form.elements[3] as HTMLInputElement).value;

                    edit && songToEdit
                        ? handleEditSong({
                              ...songToEdit,
                              title,
                              artist,
                              genre,
                              album,
                          })
                        : handleAddSong({
                              title,
                              artist,
                              genre,
                              album,
                          });
                    form.reset();
                }}
            >
                <input
                    type="text"
                    placeholder="Title"
                    defaultValue={edit && songToEdit ? songToEdit.title : ""}
                    onChange={(e) => {
                        if (edit && songToEdit) {
                            setSongToEdit({
                                ...songToEdit,
                                title: e.target.value,
                            });
                        }
                    }}
                />
                <input
                    type="text"
                    placeholder="Artist"
                    defaultValue={edit && songToEdit ? songToEdit.artist : ""}
                    onChange={(e) => {
                        if (edit && songToEdit) {
                            setSongToEdit({
                                ...songToEdit,
                                artist: e.target.value,
                            });
                        }
                    }}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    defaultValue={edit && songToEdit ? songToEdit.genre : ""}
                    onChange={(e) => {
                        if (edit && songToEdit) {
                            setSongToEdit({
                                ...songToEdit,
                                genre: e.target.value,
                            });
                        }
                    }}
                />
                <input
                    type="text"
                    placeholder="Album"
                    defaultValue={edit && songToEdit ? songToEdit.album : ""}
                />

                <button type="submit">
                    {edit ? "Update Song" : "Add Song"}
                </button>
            </form>

            <div>
                <input
                    type="text"
                    placeholder="Search by title or artist"
                    style={{ marginTop: "20px" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={() => handleFilterSongs()}>Search</button>
                <button
                    onClick={() => {
                        setSearch("");
                        dispatch(fetchSongs());
                    }}
                    style={{ marginLeft: "10px" }}
                >
                    clear filter
                </button>
            </div>

            <ul>
                {songs.map((s: any) => (
                    <div
                        key={s._id}
                        style={{
                            marginTop: "20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            listStyleType: "none",
                        }}
                    >
                        <li key={s._id}>
                            {s.title} - {s.artist}
                            {s.album} - {s.genre}
                        </li>
                        <button
                            onClick={() => {
                                setEdit(true);
                                setSongToEdit(s);
                            }}
                        >
                            Edit
                        </button>
                        <button onClick={() => handleDeleteSong(s._id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default SongList;
