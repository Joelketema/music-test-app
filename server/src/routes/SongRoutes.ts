const express = require("express");
const router = express.Router();

const {
    getAllSongs,
    createSong,
    updateSong,
    deleteSong,
    getAllStats,

    searchSongs,
} = require("../controllers/SongController");

router.get("/", getAllSongs);
router.post("/", createSong);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);
router.get("/stats", getAllStats);
router.post("/search", searchSongs);

module.exports = router;
