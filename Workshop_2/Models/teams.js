const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const team = new Schema({
    name: {type: String},
    description: { type: String}
 });

 const teamModel = mongoose.model('teams', team);

 module.exports = {
    model : team,
    schema : teamModel
 }
