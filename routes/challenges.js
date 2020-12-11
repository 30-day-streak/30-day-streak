const express = require('express');
const router = express.Router();
const Challenge = require ('../models/Challenge')

//here
router.post('/', (req, res) => {
  // console.log('test');
  // console.log('req user:', req.user._id);
  const { title, goal, category} = req.body;
  const {description, number, unit} = req.body.dailyTarget
  const owner = req.user._id
  console.log('owner', owner);
  Challenge.create({
    title,
    goal,
    // owner
    dailyTarget: {
      description,
      number,
      unit
    },
    category,
    owner
  })
    // // Get the data and return the project data as json
    // // best practice to send http code so that the client knows what's happening
    // .then(res.status(201));
  .then(challenge => {
    console.log('sucessful add');
    res.status(201).json(challenge)
  })
  .catch(err => {
    res.json(err)
  })
});

module.exports = router;
