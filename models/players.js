const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    img: {type: String, require: true},
    name: {type: String, required: true},
    country: {type: String, required: true},
    team: {type: String, required: true},
    position: {type: String, required: true},
    retired: {type: String, required: true},
    rating: {type: String, required: true},
    review: {type: String, required: true},
    author: {type: String, required: true},
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;