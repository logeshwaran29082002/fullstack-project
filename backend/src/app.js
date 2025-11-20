const express = require("express");
const app = express();
const router = require("./routes/userRoutes");
const cors = require('cors')
require("dotenv").config();


app.use(cors()); // Enable cors for all route

app.use(express.json());

app.use("/api", router);

module.exports = app;
