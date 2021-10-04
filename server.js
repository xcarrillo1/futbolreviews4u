//DEPENDENCIES
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require ("mongoose");
const Player = require("./models/players.js")
const methodOverride = require("method-override");

//DATABASE
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { 
  useNewUrlParser: true, 
  useUnifiedTopology: true }
);

// Error / success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

//MIDDLEWARE
//use public folder for static assets
app.use(express.static("public"));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// ROUTES - INDUCES
// Index
app.get('/players' , (req, res) => {
  Player.find({}, (error, allPlayers) => {
    res.render("index.ejs", {
      players: allPlayers,
    });
  });
});

// New
app.get("/players/new", (req, res) => {
  res.render("new.ejs");
});

// Delete
app.delete("/players/:id", (req, res) => {
  Player.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/players");
  });
});

// Update
app.put("/players/:id", (req, res) => {
  Player.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (error, updatedPlayer) => {
      res.redirect(`/players/${req.params.id}`);
  });
});

// Create
app.post("/players", (req, res) => {
  Player.create(req.body, (error, createdPlayer) => {
    res.redirect("/players");
  });
});

// Edit
app.get("/players/:id/edit", (req,res) => {
  Player.findById(req.params.id, (error, foundPlayer) => {
    res.render("edit.ejs", {player: foundPlayer,});
  });
});

// Show
app.get("/players/:id", (req,res) => {
  Player.findById(req.params.id, (err, foundPlayer) => {
    res.render("show.ejs", {player: foundPlayer});
  });
});

//Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Express is running on", PORT);
});