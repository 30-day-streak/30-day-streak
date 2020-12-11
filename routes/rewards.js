const express = require('express');
const router = express.Router();
const Reward = require('../models/Reward');

// get all rewards

router.get('/rewards', (req, res, next) => {
  Reward.find()
    .then(rewards => {
      console.log(rewards);

      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })
});

// get a specific reward
router.get('/rewards/:id', (req, res, next) => {
  Reward, findById(req.params.id)
    .then(reward => {
      if (!reward) {
        console.log(`no reward listed under this id`);
        res.status(404).json(reward)
      } else {
        res.status(200).json(rewards)
      }
    })
    .catch(err => {
      console.log(err);
      res.json(err)
    })
  });

  // create a reward
router.post('rewards', (req, res, next) => {
  const {name, description, category, url} = req.body;
  Reward.create({
    name,
    description,
    category,
    url
  })
  .then (reward => {
    res.status(201).json(reward)
  })
  .catch(err => {
    console.log(err);
    res.json(err)
  })
})


  // update an award?
  //here

  module.exports = router;