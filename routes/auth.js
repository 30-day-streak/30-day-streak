// require('dotenv').config();
const express = require('express');
const router  = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');


router.get('/google', passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
}))

router.get('/google/callback', passport.authenticate('google', { 
    successRedirect: `${process.env.CLIENT_URL}/`, 
    failureRedirect: `${process.env.CLIENT_URL}/login`
  })
)

router.post('/signup', (req, res, next) => {
  const { username, password, firstName, lastName, email } = req.body;

  if (password.length < 8) {
    return res.status(400).json({ message: 'Your password must be 8 chars minimum' });
  }
  if (username === '') {
    return res.status(400).json({ message: 'Your username cannot be empty' });
  }
  // check if username exists in database -> show message
  User.findOne({ username: username })
    .then(found => {
      if (found !== null) {
        return res.status(400).json({ message: 'Your username is already taken' });
      } else {
        // hash the password, create the user and send the user to the client
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        User.create({
          username,
          password: hash,
          firstName,
          lastName,
          email
        })
          .then(dbUser => {
            // login with passport:
            req.login(dbUser, err => {
              if (err) {
                return res.status(500).json({ message: 'Error while attempting to login' })
              }
              // we don't redirect to an html page anymore, we just send the user obj to the client
              return res.status(200).json(dbUser);
            });
          })
          .catch(err => {
            res.json(err);
          })
      }
    })
})

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error while authenticating' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }
    req.login(user, err => {
      if (err) {
        return res.status(500).json({ message: 'Error while attempting to login' })
      }
      User.findById(user._id).populate('challenges.id').populate('rewards')
      .then(user => {
        return res.status(200).json(user);
      })
    })
  })(req, res)
});

router.delete('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Successful logout' })
})

router.get('/loggedin', (req, res) => {
  if (req.user) {
    User.findById(req.user._id).populate('challenges.id').populate('rewards')
    .then(response => {
      res.json(response)})
  } else {
    res.json(req.user);
  }
})

module.exports = router;