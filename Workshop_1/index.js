const express = require('express');
const mongoose = require('mongoose');
const teamRoutes = require('./Controllers/teamControl');
const bodyParse = require("body-parser");

const app = express();
const db = mongoose.connect("mongodb://127.0.0.1:27017/fifaApi").then(() => console.log("Connected to MongoDB"));
const port = process.env.PORT || 3000;

app.use(bodyParse.json());
app.use('/api', teamRoutes);

app.listen(port, () => console.log("Fifa app listening on port 3000!!"))