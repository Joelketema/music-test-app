import type { Request, Response } from "express";
const Song = require("../models/Song");

const getAllSongs = async (req: Request, res: Response) => {
    try {
        const songs = await Song.find();
        console.log("Fetched songs:", songs);
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching songs" });
    }
};

const createSong = async (req: Request, res: Response) => {
    const { title, artist, album, genre } = req.body;

    if (!title || !artist || !album || !genre) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newSong = new Song({ title, artist, album, genre });
        await newSong.save();
        res.status(201).json(newSong);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const updateSong = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, artist, album, genre } = req.body;
    if (!title || !artist || !album || !genre) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const updatedSong = await Song.findByIdAndUpdate(
            id,
            { title, artist, album, genre },
            { new: true }
        );
        if (!updatedSong) {
            return res.status(404).json({ message: "Song not found" });
        }
        res.status(200).json(updatedSong);
    } catch (error) {
        res.status(500).json({ message: "Error updating song" });
    }
};

const deleteSong = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedSong = await Song.findByIdAndDelete(id);
        if (!deletedSong) {
            return res.status(404).json({ message: "Song not found" });
        }
        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting song" });
    }
};

const getAllStats = async (req: Request, res: Response) => {
    try {
        const songs = await Song.find();
        if (songs.length === 0) {
            return res.status(404).json({ message: "No songs found" });
        }

        const songsOfEachArtist: Record<string, number> = {};
        const albumsOfEachArtist: Record<string, Set<string>> = {};

        songs.forEach((song: any) => {
            songsOfEachArtist[song.artist] =
                (songsOfEachArtist[song.artist] || 0) + 1;

            if (!albumsOfEachArtist[song.artist]) {
                albumsOfEachArtist[song.artist] = new Set();
            }
            albumsOfEachArtist[song.artist].add(song.album);
        });

        let popularArtist = "";
        let maxSongs = 0;
        for (const artist in songsOfEachArtist) {
            if (songsOfEachArtist[artist] > maxSongs) {
                maxSongs = songsOfEachArtist[artist];
                popularArtist = artist;
            }
        }

        let popularGenre = "";
        let maxGenreCount = 0;
        const genreCount: Record<string, number> = {};
        songs.forEach((song: any) => {
            genreCount[song.genre] = (genreCount[song.genre] || 0) + 1;
            if (genreCount[song.genre] > maxGenreCount) {
                maxGenreCount = genreCount[song.genre];
                popularGenre = song.genre;
            }
        });

        let numberOfSongsInEachGenre: Record<string, number> = {};
        songs.forEach((song: any) => {
            numberOfSongsInEachGenre[song.genre] =
                (numberOfSongsInEachGenre[song.genre] || 0) + 1;
        });

        const stats = {
            totalSongs: songs.length,
            totalArtists: new Set(songs.map((song: any) => song.artist)).size,
            totalAlbums: new Set(songs.map((song: any) => song.album)).size,
            totalGenres: new Set(songs.map((song: any) => song.genre)).size,
            songsInEachGenre: songs.reduce((acc: any, song: any) => {
                acc[song.genre] = (acc[song.genre] || 0) + 1;
                return acc;
            }, {}),
            songsOfEachArtist,
            songsInEachAlbum: songs.reduce((acc: any, song: any) => {
                acc[song.album] = (acc[song.album] || 0) + 1;
                return acc;
            }, {}),
            popularArtist,
            popularGenre,
            numberOfSongsInEachGenre,
            numberOfAlbumsPerArtist: Object.fromEntries(
                Object.entries(albumsOfEachArtist).map(([artist, albums]) => [
                    artist,
                    albums.size,
                ])
            ),
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const searchSongs = async (req: Request, res: Response) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ message: "Search field is required" });
    }
    try {
        const songs = await Song.find({
            $or: [
                { artist: { $regex: query, $options: "i" } },
                { title: { $regex: query, $options: "i" } },
                { album: { $regex: query, $options: "i" } },
                { genre: { $regex: query, $options: "i" } },
            ],
        });
        if (songs.length === 0) {
            return res
                .status(200)

                .json([]);
        }
        res.status(200).json(songs);
    } catch (error) {
        console.error("Error fetching songs by artist:", error);
        res.status(500).json({ message: "Error fetching songs by artist" });
    }
};

module.exports = {
    getAllSongs,
    createSong,
    updateSong,
    deleteSong,
    getAllStats,

    searchSongs,
};
