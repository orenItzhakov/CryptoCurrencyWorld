const express = require('express')
const router = express.Router()
const Transaction = require('../models/boughtCoin');
const User = require('../models/user');
const Coin = require('../models/coin');
const Detail = require('../models/detail')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

router.get('/myPortfolio/:ID', (req, res) => {
    let userID = req.params.ID;
    User.find({ _id: userID }).populate('coins').exec()
        .then(data => {
            console.log(data);
            res.send(JSON.stringify(data));
        })
        .catch(err => console.log(err));
})

router.get('/allUsers', (req, res) => {
    User.find().populate('coins').exec()
        .then(data => {
            res.send(JSON.stringify(data));
        })
        .catch(err => console.log(err));
})

router.post('/buy', (req, res) => {
    let userID = req.body.id;
    let coinName = req.body.coin;
    let amount = req.body.amount;
    let usd = req.body.usd;
    User.find({ _id: userID }).populate('coins').exec()
        .then(user => {
            Coin.find({ name: coinName }).exec()
                .then(coin => {
                    let trans = new Transaction({
                        _id: new mongoose.Types.ObjectId(),
                        name: coinName,
                        amount: amount,
                        currentPrice: usd,
                        Date: new Date(),
                        user: userID,
                        isActive: true
                    });
                    trans.save();
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
    Transaction.find({ _id: transID }).exec()
        .then(trans => {
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

router.post('/add', (req, res) => {
    var newUser = req.body.newUser;
    User.find({ email: newUser.email }).exec()
        .then(user => {
            if (user.length !== 0) {
                res.send({ user: user, status: false });
            } else {
                let user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    balance: 5000,
                    coins: []
                });
                user.save();
                res.send({ user: user, status: true })
            }
        })
})

router.post('/addDetail', (req, res) => {
    var userDetail = req.body.userDetail;
    var ID = req.body.userID;
    Detail.find({ username: userDetail.username }).exec()
        .then(userDetails => {
            if (userDetails.length !== 0) {
                User.deleteOne({ _id: ID }, function (err) {
                    if (err) console.log(err);
                })
                res.send({ user: userDetails, status: false });
                return;
            } else {
                bcrypt.hash(userDetail.password, 10, (err, hash) => {
                    if (err) console.log(err);
                    else {
                        User.find({ _id: ID }).exec()
                            .then(user => {
                                let detail = new Detail({
                                    user_id: user[0]._id,
                                    username: userDetail.username,
                                    password: hash
                                });
                                detail.save();
                            });
                        User.find({ _id: ID }).exec()
                            .then(user => {
                                res.send(JSON.stringify({ user: user, status: true }));
                            })
                    }
                })
            }
        })
})

module.exports = router