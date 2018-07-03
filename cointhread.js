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

setInterval(function () {
request('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,BCH,EOS,LTC,XLM,ADA,USDT,IOT,TRX,XMR,NEO,DASH,BNB,ETC,VEN,XEM,ONT,QTUM&tsyms=USD', function (error, response, body) {
    let obj = JSON.parse(body);
    obj = Object.values(obj);
    let objn = Object.values(obj);
    let objnw = Object.values(objn[0]);
    //console.log(objnw[0].USD);

        Coin.find().exec()
            .then(coins => {
                for (var i = 0; i < coins.length; i++) {
                    var id = coins[i]._id;
                    var shortName = coins[i].shortName;
                    let stop = true;
                    for (var j = 0; j < objnw.length && stop; j++) {
                        if (shortName == objnw[j].USD.FROMSYMBOL) {
                            stop = false;
                            let newCoin = {
                                name: coins[i].name,
                                shortName: objnw[j].USD.FROMSYMBOL,
                                price: objnw[j].USD.PRICE,
                                market_cap: objnw[j].USD.MKTCAP,
                                volume: objnw[j].USD.TOTALVOLUME24HTO,
                                change: objnw[j].USD.CHANGEPCT24HOUR,
                                circulating_supply: objnw[j].USD.SUPPLY
                            };
                            Coin.update({ _id: id }, newCoin, { multi: false }, function (err, resp) { // we ned to figure out how to make the changes of all field of the form, not just the name.
                                if (err) throw err;        
                                console.log(newCoin.price);
                            });
                        }
                    }
                }
            })

});
}, 5000);

