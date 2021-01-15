require('dotenv').config();

const User = require('../models/User.js');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(dbUser => {
      done(null, dbUser);
    })
    .catch(error => {
      done(error);
    })
});

// local login
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
      .then(found => {
        if (found === null) {
          done(null, false, { message: 'Wrong Credentials' })
        } else if (!bcrypt.compareSync(password, found.password)) {
          done(null, false, { message: 'Wrong Credentials' })
        } else {
          done(null, found);
        }
      })
      .catch(error => {
        done(error, false);
      })
  })
)

// Google login
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
      // callbackURL: `http://localhost:5555/api/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:
      console.log("Google account details:", profile);
      User.findOne({ googleID: profile.id })
        .then((user) => {
          console.log('USER', user)
          if (user) {
            console.log('HERE')
            done(null, user);
            return;
          } else {
            console.log('THERE')
            User.create({
              googleID: profile.id,
              email: profile._json.email,
              firstName: profile._json.given_name,
              lastName: profile._json.family_name,
            }).then(newUser => {
                done(null, newUser);
              })
              .catch((err) => done(err));
          }
        })
        .catch((err) => done(err));
    }
  )
);