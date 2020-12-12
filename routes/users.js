const express = require('express');
const router  = express.Router();
const User = require('../models/User');


router.get('/:id', (req, res) => {
  User.findById(req.params.id)
  .then(() => {
    res.json(req.user);
  })
})

// add a challenge to users challenges (favorites)
router.put('/:id/status', (req, res, next) => {
  console.log(req.body.favorite)
  if (req.body.favorite) {
    console.log('ADD')
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
    console.log('REMOVE')
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

// change challenge status from favorite to active


module.exports = router;