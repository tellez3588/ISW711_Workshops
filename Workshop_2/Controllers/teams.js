const express = require('express');
const router = express.Router();
const Team = require('../Models/teams');

//Post to create a new team
router.post('/team', (req, res) => {
    const newTeam = new Team(req.body);
    newTeam.save((error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(201).json(newTeam);
    });
});

//Get all teams 
/*router.get('/team', (req, res) => {
    Team.find({}, (error, teams) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(teams);
    });
});*/