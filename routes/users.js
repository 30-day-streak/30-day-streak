const express = require('express');
const Challenge = require('../models/Challenge');
const router = express.Router();
const User = require('../models/User');

// change challenge status (when liking or starting a challenge)
// I think this below had been replaced by the code at the bottom but kept it just in case
// router.put('/:id/status', (req, res, next) => {
//   console.log(req.body.challenges);
//   const { status } = req.body.challenges;
//   User.findByIdAndUpdate(req.params.id, { status }, { new: true })
//     .then((challenge) => {
//       console.log(challenge);
//       res.status(200).json(challenge);
//     })
//     .catch((err) => next(err));
// });

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

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(() => {
      res.json(req.user);
    })
})

// add a challenge to users challenges (favorites)
router.put('/:id/challengesfavorite', (req, res, next) => {
  if (req.body.favorite) {
    User.findByIdAndUpdate(req.user._id, {
      $push: {
        challenges: {
          id: req.params.id,
          status: 'favorite',
        },
      }
    })
      .then(challenge => {
        res.status(200).json(challenge);
      })
      .catch(err => next(err))
  } else {
    User.findByIdAndUpdate(req.user._id, {
      $pull: {
        challenges: {
          id: req.params.id,
        },
      }
    })
      .then(challenge => {
        res.status(200).json(challenge);
      })
      .catch(err => next(err))
  }
})

// add a reward to users rewards (favorites)
router.put('/:id/rewardsfavorite', (req, res, next) => {
  if (req.body.favorite) {
    User.findByIdAndUpdate(req.user._id, {
      $push: {
        rewards: req.params.id,
      }
    })
      .then(reward => {
        res.status(200).json(reward);
      })
      .catch(err => next(err))
  } else {
    User.findByIdAndUpdate(req.user._id, {
      $pull: {
        rewards: req.params.id,
      }
    })
      .then(reward => {
        res.status(200).json(reward);
      })
      .catch(err => next(err))
  }
})

// general user update from frontend
router.put('/:id', (req, res, next) => {
  const { challenges, rewards } = req.body

  User.findByIdAndUpdate(
    req.params.id,
    { /* challenges,  */rewards },
    { new: true }
  )
    .then(user => {
      console.log({ user });
      res.status(200).json(user);
    })
    .catch(err => { console.log(err) })
});

//router.put('/:id', (req, res, next) => {
  // console.log('req user', req.user);
 // const {challenges} = req.body.user;
 // console.log('user challenges', challenges);
 // User.findByIdAndUpdate(
//    req.params.id,
 //   {challenges}
//  )
//  .then(user => {
//    res.status(200).json(user)
//  })
//  .catch(err => {
//  })
//})

// router.put('/:id', async (req, res, next) => {
//   const id = req.params.id
//   // console.log('id', id);
//   // const {challenges} = req.user
//   console.log('req.body', req.body.user.challenges);
//   let usersChallenges = await Challenge.findById(req.params.id)
  
  
//   // User.findByIdAndUpdate(id, {challenges})
// })


// change challenge status from favorite to active


module.exports = router;
