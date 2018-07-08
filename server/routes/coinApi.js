const express = require('express')
const router = express.Router()
const Transaction = require('../models/boughtCoin');
const User = require('../models/user');
const Coin = require('../models/coin');
const mongoose = require('mongoose');
var expressJwt = require('express-jwt');
let authenticate = expressJwt({ secret: 'thisIsTopSecret' });

router.get('/', authenticate, (req, res) => {
    Coin.find().exec()
    .then(coins => {
        res.send(JSON.stringify(coins));
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router