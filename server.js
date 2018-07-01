
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
let authenticate = expressJwt({ secret: 'thisIsTopSecret' });
const Detail = require('./server/models/detail');
const User = require('./server/models/user');
const bcrypt = require('bcrypt');

const userRoutes = require('./server/routes/userApi');
const coinRoutes = require('./server/routes/coinApi');


const app = express();

mongoose.connect('mongodb://CCW:Aiagm100p@ds219181.mlab.com:19181/crypto_currency_world');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

passport.use(new LocalStrategy(
  //    { passReqToCallback : true},
  function (username, password, done) {
    Detail.find().exec()
      .then(details => {
        for (var i = 0; i < details.length; i++) {
          if (username === details[i].username) {
            bcrypt.compare(password, details[i].password, (err, result) => {
              if (result) {
                return done(null, { userID: details[i].user_id });
              } else {
                return done(null, false);
              }

            })
          }
        }
      })
  }
));

app.post('/login', passport.authenticate('local', { session: false }),
  (req, res) => {
    let token = jwt.sign(req.user, 'thisIsTopSecret', { expiresIn: '7d' });
    console.log(req.user)
    res.send({ token, ID: req.user });
  });

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/CryptoCurrencyWorld')));
app.use(express.static(path.join(__dirname, 'node_modules')));


// Set our api routes
app.use('/user', userRoutes);
app.use('/coins', coinRoutes);
// app.use('/comments', commentsRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/CryptoCurrencyWorld/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));