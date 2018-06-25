const express = require('express')
const router = express.Router()
const User = require('./server/models/user');
const Transaction = require('./server/models/boughCoin');
const Coin = require('./server/models/coin');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/CoinsDB');

User.findOne({firstName : 'Amir'}).exec()
.then(data =>  {
    data.coins.push(trans2);
    data.save();
})

// Coin.find().exec()
//     .then(coins => {
//         setInterval(function () {
//             for (var i = 0; i < coins.length; i++) {
//                 coins[i].price += (Math.random() * 0.4 - 0.2) * coins[i].price;
//                 coins[i].save();
//                 console.log(coins[i].name + ' new price: ' + coins[i].price);
//             }
//         }, 3000);
//     })


// Coin.create({
//     _id: 1111,
//     name: 'Bitcoin',
//     price: 5900,
//     market_cap: 115000000,
//     volume: 3000000,
//     change: 3,
//     circulating_supply : 117000000
// }, function(err, data) {
//     if (err) {
//         return console.error(err)
//     }
//     console.log(data)
// })

// Coin.create({
//     _id: 2222,
//     name: 'Ethereum',
//     price: 440,
//     market_cap: 11500000,
//     volume: 300000,
//     change: -2,
//     circulating_supply : 117000000
// },  function(err, data) {
//     if (err) {
//         return console.error(err)
//     }
//     console.log(data)
// })

// Coin.create({
//     _id: 3333,
//     name: 'Doge',
//     price: 500,
//     market_cap: 1150000,
//     volume: 30000,
//     change: -2,
//     circulating_supply : 11700000
// },  function(err, data) {
//     if (err) {
//         return console.error(err)
//     }
//     console.log(data)
// })


// var trans2 = new Transaction({
//     _id: new mongoose.Types.ObjectId(),
//     name: 'Ethereum',
//     amount: 0.03,
//     currentPrice: 5960,
//     Date: new Date()
// });

// trans2.save();