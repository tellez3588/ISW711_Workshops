const express = require('express');
const router = express.Router();
const Player = require('../Models/playerModel');
const Team = require('../Models/teamModel');

//Create a new player with or without team
router.post('/players', async function (req, res) {
    const newPlayer = new Player.model();
    newPlayer.name = req.body.name;
    newPlayer.country = req.body.country;
    newPlayer.position = req.body.position;
    newPlayer.age = req.body.age;
  
    //find the team
    try {
      const teamFound = await Team.model.findById(req.body.team);
      if (teamFound) {
        newPlayer.team = teamFound;
      }
  
      // create the player anyway
      if (newPlayer.name && newPlayer.name) {
        await newPlayer.save();
        res.status(201);//CREATED
        res.header({
          'location': `http://localhost:3000/players/?id=${newPlayer.id}`
        });
        res.json(newPlayer);
      } else {
        res.status(422);
        console.log('error while saving the player')
        res.json({
          error: 'No valid data provided for player'
        });
      }
  
    } catch (error) {
      res.status(422);
      console.log('error while saving the player', error)
      res.json({
        error: 'There was an error creating the player'
      });
    }
  });


//Get all players from API
router.get('/players', (req, res) => {
    Player.model.find({}, (error, players) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(players);
    });
});

//Get one player by id
router.get('/players/:id', (req, res) => {
    Player.model.findById(req.params.id, (error, players) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!players) {
            return res.status(404).send('Team not found');
        }
        res.status(200).json(players);
    });
});

//update player
//TODO this method not work
/*router.put('/players/:id', (req, res) => {
    Player.model.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, player) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!player) {
            return res.status(404).send('Player not found');
        }
        res.status(200).json(player);
    });
});*/
router.put('/players/:id', async function (req, res) {
    try {
      const playerId = req.params.id;
      const player = await Player.model.findById(playerId);
  
      if (player) {
        // Update the player information
        player.name = req.body.name || player.name;
        player.coutry = req.body.country || player.country;
        player.position = req.body.position || player.position;
        player.age = req.body.age || player.age;
  
        // Update the team if provided
        if (req.body.team) {
          const teamFound = await Team.model.findById(req.body.team);
          if (teamFound) {
            player.team = teamFound;
          }else{
            player.team = req.body.team;
          }
        }
  
        // Save the changes
        await player.save();
  
        res.status(200); // OK
        res.json(player);
      } else {
        res.status(404); // Not Found
        res.json({
          error: 'Player not found'
        });
      }
    } catch (error) {
      res.status(422);
      console.log('error while updating the player', error);
      res.json({
        error: 'There was an error updating the player'
      });
    }
  });

  //delete a player
router.delete('/players/:id', (req, res) => {
  Player.model.findByIdAndRemove(req.params.id, (error, player) => {
      if (error) {
          return res.status(500).send(error);
      }
      if (!player) {
          return res.status(404).send('Team not found');
      }
      res.status(200).send('Team deleted successfully');
  });
});

module.exports = router;