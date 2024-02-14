require("dotenv").config();
import express from 'express';
// Config https
import https from "https";
import fs from "fs";

/////
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const url = process.env.DB_URL;
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
