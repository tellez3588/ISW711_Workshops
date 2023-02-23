const express = require('express');
const router = express.Router();
const Team = require('../Models/teamModel');


//Post to create a new team
router.post('/teams', (req, res) => {

    const newTeam = new Team.model(req.body);
    newTeam.save((error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(201).json(newTeam);
    });
});

//Get all teams 
router.get('/teams', (req, res) => {
    Team.model.find({}, (error, teams) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(teams);
    });
});

router.get('/teams/:id', (req, res) => {
    Team.model.findById(req.params.id, (error, teams) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!teams) {
            return res.status(404).send('Team not found');
        }
        res.status(200).json(teams);
    });
});


//update team
router.put('/teams/:id', (req, res) => {
    Team.model.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, team) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!team) {
            return res.status(404).send('Team not found');
        }
        res.status(200).json(team);
    });
});

//delete team
router.delete('/teams/:id', (req, res) => {
    Team.model.findByIdAndRemove(req.params.id, (error, team) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!team) {
            return res.status(404).send('Team not found');
        }
        res.status(200).send('Team deleted successfully');
    });
});


module.exports = router;