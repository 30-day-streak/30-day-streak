const express = require('express');
const router  = express.Router();
const Challenge = require('../models/Challenge');

// get all challenges
router.get('/', (req, res) => {
  Challenge.find()
    .then(challenges => {
      console.log(challenges)
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

})


module.exports = router;