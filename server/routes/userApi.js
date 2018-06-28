const express = require('express')
const router = express.Router()
const Transaction = require('../models/boughtCoin');
const User = require('../models/user');
const Coin = require('../models/coin');
const mongoose = require('mongoose');

router.get('/myPortfolio', (req, res) => {
    User.find().populate('coins').exec()
        .then(data => {
            console.log(data);
            res.send(JSON.stringify(data));
        })
        .catch(err => console.log(err));
})

router.post('/buy', (req, res) => {
    let userID = req.body.id;
    let coinName = req.body.coin;
    let amount = req.body.amount;
    User.find({ _id: userID }).populate('coins').exec()
        .then(user => {
            Coin.find({ name: coinName }).exec()
                .then(coin => {
                    //console.log(user);
                    // console.log(coin);
                    let trans = new Transaction({
                        _id: new mongoose.Types.ObjectId(),
                        name: coinName,
                        amount: amount,
                        currentPrice: coin[0].price,
                        Date: new Date(),
                        user: userID,
                        isActive: true
                    });
                    trans.save();
                    //console.log(trans);
                    user[0].coins.push(trans);
                    user[0].balance -= amount * coin[0].price;
                    user[0].save();
                    User.find({ _id: userID }).populate('coins').exec()
                        .then(user => {
                            res.send(JSON.stringify(user));
                        })
                })
        })
        .catch(err => console.log('not here'));
})
router.post('/sell', (req, res) => {
    var transID = req.body.coin;
    var userID = req.body.user;
    console.log(transID, userID)
    Transaction.find({ _id: transID }).exec()
        .then(trans => {
            console.log(trans);
            User.find({ _id: userID }).populate('coins').exec()
                .then(user => {
                    user[0].balance += trans[0].amount * trans[0].currentPrice;
                    trans[0].isActive = false;
                    trans[0].save();
                    user[0].save();
                    User.find({ _id: userID }).populate('coins').exec().then(user => {
                        res.send(JSON.stringify(user));
                    });
                });
        })
})
module.exports = router