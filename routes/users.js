const express = require('express');
const router  = express.Router();
const User = require('../models/User');


// change challenge status (when liking or starting a challenge)
router.put('/:id/status', (req, res, next) => {
  console.log(req.body.challenges)
  const { status } = req.body.challenges;
  User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).then(challenge => {
      console.log(challenge);
      res.status(200).json(challenge);
  }).catch(err => next(err))
})



module.exports = router;