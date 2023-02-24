const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Team = require('./teamModel');

const playerSchema = new Schema({
    name: {type: String},
    country: {type: String},
    position: { type: String},
    age: { type: Number},
    team:{
        type: Team.schema,
        required: false
      }
 });

 module.exports = {
   "model" : mongoose.model('players', playerSchema),
   "schema" : playerSchema
 }