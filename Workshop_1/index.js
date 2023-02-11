const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParse = require("body-parser");
const userRoute = require('./Controllers/teamControl');
const teamModel = require("./Models/teamModel");

app.use(bodyParse.json());
app.use('/api',userRoute);
const db = mongoose.connect("mongodb://127.0.0.1:27017/fifaApi");



app.listen(3000, () => console.log("Fifa app listening on port 3000!!"))