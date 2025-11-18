const express = require("express");
const app = express();
const router = require('./routes/userRoutes')
require('dotenv').config({ quiet: true });

app.use(express.json());



// Routes
app.use('/api',router)

module.exports = app;
