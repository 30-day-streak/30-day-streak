const express = require('express');
const router  = express.Router();
const User = require('../models/User');


// change challenge status (when liking or starting a challenge)
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
  // User.findById(req.user.id)
  // .then(user => {
  //   const alreadyInFavs = user.challenges.filter(challenge => challenge.id.toString() == req.body.id);
  //   if (req.body.favorite) console.log('Add')
  //   else console.log('Remove')
  // })
})


module.exports = router;

// const userChallenges = [];
// user[0].challenges.forEach(challenge => userChallenges.push(challenge.id));

// const add = userChallenges.filter(challenge => challenge == req.params.id )
// console.log(typeof userChallenges)

// if (add) {
//   console.log('1', typeof userChallenges[0], '2', typeof req.params.id, '3', add)
//   console.log('ADD')
//   User.findByIdAndUpdate(
//     req.user._id, {
//       $push: {
//         challenges: {
//           id: req.params.id,
//           status: 'favorite',
//         },
//       }}
//     )
//     .then(challenge => {
//       res.status(200).json(challenge);
//   })
//   .catch(err => next(err))
// } else {
//   console.log('REMOVE')
//   User.findByIdAndUpdate(
//     req.user._id, {
//       $pull: {
//         challenges: {
//           id: req.params.id,
//         },
//       }}
//     )
//     .then(challenge => {
//       res.status(200).json(challenge);
//   })
//   .catch(err => next(err))
// }