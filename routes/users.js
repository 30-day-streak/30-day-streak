const express = require('express');
const Challenge = require('../models/Challenge');
const router = express.Router();
const User = require('../models/User');


//get all users
router.get('/', (req, res) => {
  User.find()
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((err) => next(err));
})

// get a specific user
router.get('/:id', (req, res) => {
  User.findById(req.params.id).then(() => {
    res.json(req.user);
  });
});

// add a challenge to users challenges (favorites)
router.put('/:id/challengesfavorite', (req, res, next) => {
  if (req.body.favorite) {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          challenges: {
            id: req.params.id,
            status: 'favorite',
          },
        },
      },
      { new: true }
    )
      .populate('challenges.id')
      .populate('rewards')
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => next(err));
  } else {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          challenges: {
            id: req.params.id,
          },
        },
      },
      { new: true }
    )
      .populate('challenges.id')
      .populate('rewards')
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => next(err));
  }
});

// add a reward to users rewards (favorites)
router.put('/:id/rewardsfavorite', (req, res, next) => {
  if (req.body.favorite) {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          rewards: req.params.id,
        },
      },
      { new: true }
    )
      .populate('challenges.id')
      .populate('rewards')
      .then((reward) => {
        res.status(200).json(reward);
      })
      .catch((err) => next(err));
  } else {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          rewards: req.params.id,
        },
      },
      { new: true }
    )
      .populate('challenges.id')
      .populate('rewards')
      .then((reward) => {
        res.status(200).json(reward);
      })
      .catch((err) => next(err));
  }
});

// update status / withdrawn from challenge
router.put('/:id/withdraw', (req, res, next) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id,
      'challenges.id': req.params.id,
    },
    {
      $set: {
        'challenges.$.status': 'withdrawn',
      },
    },
    { new: true }
  )
    .populate('challenges.id')
    .populate('rewards')
    .then((challenge) => {
      res.status(200).json(challenge);
    })
    .catch((err) => {
      next(err);
    });
});

// general user update from frontend
router.put('/:id', (req, res, next) => {
  const { challenges, rewards } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    { challenges, rewards },
    { new: true }
  ).populate('challenges.id').populate('rewards')
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      // console.log(err) 
    })
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

module.exports = router;