const express = require('express');
const router  = express.Router();
const Challenge = require('../models/Challenge');

// get all challenges
router.get('/', (req, res) => {
  Challenge.find()
    .then(challenges => {
      res.status(200).json(challenges);
    })
    .catch(err => {
      res.json(err);
    })
});

// get a specfic challenge
router.get('/:id', (req, res) => {
  Challenge.findById(req.params.id)
    .then(challenge => {
      if (!challenge) {
        res.status(404).json(challenge);
      } else {
        res.status(200).json(challenge);
      }
    })
    .catch(err => {
      res.json(err);
    })
});

// create a project
router.post('/', (req, res) => {
  const { title, goal, category} = req.body;
  const { description } = req.body.dailyTarget
  const owner = req.user._id
  Challenge.create({
    title,
    goal,
    dailyTarget: {
      description,
    },
    category,
    owner
  })
    // // Get the data and return the project data as json
    // // best practice to send http code so that the client knows what's happening
    // .then(res.status(201));
  .then(challenge => {
    res.status(201).json(challenge)
  })
  .catch(err => {
    res.json(err)
  })
});

module.exports = router;
