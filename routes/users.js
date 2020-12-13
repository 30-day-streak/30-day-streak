const express = require('express');
const router = express.Router();
const User = require('../models/User');

// change challenge status (when liking or starting a challenge)
router.put('/:id/status', (req, res, next) => {
  console.log(req.body.challenges);
  const { status } = req.body.challenges;
  User.findByIdAndUpdate(req.params.id, { status }, { new: true })
    .then((challenge) => {
      console.log(challenge);
      res.status(200).json(challenge);
    })
    .catch((err) => next(err));
});

// this is a whole mess trying to query into the user array
// hopefully it will be functional some day
// maybe post?
// here we are changing the status to active
// and adding the grand prize to the user challenge
// route that add challenge to user array
// router.put('/test', (req, res, next) => {
//   // challengeID = req.params.id
//   challengeID = '5fd367522fc3862285e03fab';
//   loggedInUser = req.user._id;
//   User.find(
//     { _id: req.user.id},
//     { 'challenges.2.status' : 'favorite'}
//   ).then(
//     (response) => {
//       console.log('response from mongo find', response);
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// });

module.exports = router;
