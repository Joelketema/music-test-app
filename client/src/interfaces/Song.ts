export interface Song {
    _id?: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
}

export interface Stats {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalGenres: number;
    popularArtist: string;
    popularGenre: string;
    numberOfAlbumsPerArtist: number;
    numberOfSongsInEachGenre: number;
    songsInEachAlbum: number;
    songsOfEachArtist: number;
    songsInEachGenre: number;
}
