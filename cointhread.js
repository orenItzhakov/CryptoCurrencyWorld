const express = require('express')
const router = express.Router()
const User = require('./server/models/user');
const Transaction = require('./server/models/boughtCoin');
const Coin = require('./server/models/coin');
const mongoose = require('mongoose');
const request = require('request');
const coinHistory = require('./server/models/coinHistory');

mongoose.connect('mongodb://CCW:Aiagm100p@ds219181.mlab.com:19181/crypto_currency_world');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
// setInterval(function () {
    request('http://coincap.io/front', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let obj = JSON.parse(body);
        //console.log(obj);
        Coin.find().exec()
            .then(coins => {
                for (var i = 0; i < 20; i++) {
                    coins[i].name = obj[i].long;
                    coins[i].shortName = obj[i].short;
                    coins[i].price = obj[i].price;
                    coins[i].market_cap = obj[i].mktcap;
                    coins[i].volume = obj[i].volume;
                    coins[i].change = obj[i].perc;
                    coins[i].circulating_supply = obj[i].supply;
                    coins[i].save();
                }
            })
            .catch(err => {
                console.error(err);
            })
    })
// }, 5000);


    request('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=100', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let obj = JSON.parse(body)
        coinHistory.find().exec()
            .then(coinHistorys => {
                obj.Data.forEach(element => {
                    coinHistorys.price = element.close
                    coinHistorys.date = element.time
                });
                    

            })
            .catch(err => {
                console.error(err);
            })
    })
