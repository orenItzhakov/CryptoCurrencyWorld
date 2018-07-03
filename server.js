
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Get our API routes
const userRoutes = require('./server/routes/userApi');
const coinRoutes = require('./server/routes/coinApi');
const coinHistoryRoutes = require('./server/routes/coinHistoryApi');

const app = express();

mongoose.connect('mongodb://CCW:Aiagm100p@ds219181.mlab.com:19181/crypto_currency_world');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/CryptoCurrencyWorld')));
app.use(express.static(path.join(__dirname, 'node_modules')));


// Set our api routes
app.use('/user', userRoutes);
app.use('/coins', coinRoutes);
app.use('/coinHistory', coinHistoryRoutes);
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