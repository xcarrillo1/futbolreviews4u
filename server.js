//DEPENDENCIES
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require ("mongoose")
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

// ROUTES - INDUCES / CONTROLLERS
const PlayersController = require("./controllers/player.js");
app.use("/", PlayersController);

//Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Express is running on", PORT);
});