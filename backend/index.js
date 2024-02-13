require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const url = process.env.DB_URL;

const app = express();
app.use(express.json());
