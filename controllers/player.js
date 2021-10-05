const express = require("express");
const playerRouter = express.Router();
const Player = require("../models/players.js")

// Index
playerRouter.get('/' , (req, res) => {
    Player.find({}, (error, allPlayers) => {
      res.render("index.ejs", {
        players: allPlayers,
      });
    });
  });
  
  // New
  playerRouter.get("/new", (req, res) => {
    res.render("new.ejs");
  });
  
  // Delete
  playerRouter.delete("/:id", (req, res) => {
    Player.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect("/players");
    });
  });
  
  // Update
  playerRouter.put("/:id", (req, res) => {
    if (req.body.retired === 'on') {
          req.body.retired = true;
      } else {
          req.body.retired = false;
      }
    Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }, (error, updatedPlayer) => {
        res.redirect(`/players/${req.params.id}`);
    });
  });
  
  // Create
  playerRouter.post("/", (req, res) => {
    if(req.body.retired === "on") {
      req.body.retired = true;
  } else {
      req.body.retired = false;
  }
    Player.create(req.body, (error, createdPlayer) => {
      res.redirect("/players");
    });
  });
  
  // Edit
  playerRouter.get("/:id/edit", (req,res) => {
    Player.findById(req.params.id, (error, foundPlayer) => {
      res.render("edit.ejs", {player: foundPlayer,});
    });
  });
  
  // Show
  playerRouter.get("/:id", (req,res) => {
    Player.findById(req.params.id, (err, foundPlayer) => {
      res.render("show.ejs", {player: foundPlayer});
    });
  });

module.exports = playerRouter;