const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDatabase } = require("./db/DB");
const songRoutes = require("./routes/SongRoutes");

import type { Request, Response } from "express";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/song", songRoutes);

connectToDatabase();

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
