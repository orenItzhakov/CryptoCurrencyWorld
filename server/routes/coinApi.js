const express = require('express')
const router = express.Router()
const Transaction = require('../models/boughtCoin');
const User = require('../models/user');
const Coin = require('../models/coin');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    Coin.find().exec()
    .then(coins => {
        res.send(JSON.stringify(coins));
    })
})

module.exports = router