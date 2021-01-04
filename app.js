require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');


mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const session = require('express-session');
const passport = require('passport');

require('./configs/passport.js');

const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
      // when the session cookie has an expiration date
      // connect-mongo will use it, otherwise it will create a new 
      // one and use ttl - time to live - in that case one day
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 1000
    })
  })
)

// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//       // callbackURL: "https://thirty-day-streak.herokuapp.com/google/callback",
//       callbackURL: "http://localhost:3000/google/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // to see the structure of the data in received response:
//       console.log("Google account details:", profile._json);
//       User.findOne({ googleID: profile.id })
//         .then((user) => {
//           if (user) {
//             done(null, user);
//             return;
//           } else {
//             // console.log('profile', profile);
//             User.create({
//               username: profile.id,
//               email: profile._json.email,
//               firstName: profile._json.given_name,
//               lastName: profile._json.family_name,
//             }).then(newUser => {
//                 done(null, newUser);
//               })
//               .catch((err) => done(err));
//           }
//         })
//         .catch((err) => done(err));
//     }
//   )
// );

app.use(passport.initialize());
app.use(passport.session());

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const dashboard = require('./routes/dashboard');
app.use('/', dashboard);

const auth = require('./routes/auth');
app.use('/auth', auth);

const challenges = require('./routes/challenges');
app.use('/api/challenges', challenges);

const rewards = require('./routes/rewards');
app.use('/api/rewards', rewards);

const users = require('./routes/users');
app.use('/api/users', users);

app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
