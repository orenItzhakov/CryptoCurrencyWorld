const express = require('express')
const router = express.Router()
const Transaction = require('../models/boughtCoin');
const User = require('../models/user');
const Coin = require('../models/coin');
const CoinHistory = require('../models/coinHistory');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    CoinHistory.find().exec()
    .then(coins => {
        res.send(JSON.stringify(coins));
    })
})

router.get('/:shortName', (req, res) => {
    let shortName = req.params.shortName;
    CoinHistory.find({shortName:shortName}).exec()
    .then(coins => {
        res.send(JSON.stringify(coins));
    })
})

module.exports = router