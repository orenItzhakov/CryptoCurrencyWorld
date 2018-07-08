const express = require('express')
const router = express.Router()
const User = require('./server/models/user');
const Transaction = require('./server/models/boughtCoin');
const Coin = require('./server/models/coin');
const mongoose = require('mongoose');
const request = require('request');
const CoinHistoryData = require('./server/models/coinHistoryData');
const CoinHistory = require('./server/models/coinHistory');

// mongoose.set('debug', true);

mongoose.connect(process.env.CONNECTION_STRING);

// mongoose.connect('mongodb://localhost/cryptoDB', function() {
//   console.log("DB connection established!!!");
// })

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

let  dayInMilliseconds = 1000 * 60 * 60 * 24;

let cryptoArray = [ "BTC","ETH","XRP","EOS","LTC","XLM","ADA","USDT","IOT","TRX","XMR","NEO","DASH","BNB","ETC","VEN","XEM","QTUM" ] 

// TODO: loop thru cryptoArray, and launch request for each crypto
let newResult=[]
setInterval(function () {

    cryptoArray.forEach((el)=>{
        request(`https://min-api.cryptocompare.com/data/histoday?fsym=${el}&tsym=USD&limit=200`, function (error, response, body) {
            let obj = JSON.parse(body)
            let dataArray = obj.Data
            // console.log(dataArray)
            
            dataArray.forEach((e)=>{
                newResult.push({price: e.close, date:e.time})
                // ,{ "new": true, "upsert": true }

                CoinHistory.findOneAndUpdate({shortName:el},{ $set: { coinHistoryData: newResult }},{ "new": true, "upsert": true },
                function(err, result1) {
                // if (err) throw err;
                // else res.send(result1);
              });})
                newResult.length=0;
                });

            })

        },15000)



setInterval(function () {
request('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,EOS,LTC,XLM,ADA,USDT,IOT,TRX,XMR,NEO,DASH,BNB,ETC,VEN,XEM,QTUM&tsyms=USD', function (error, response, body) {
    let obj = JSON.parse(body);
    obj = Object.values(obj);
    let objn = Object.values(obj);
    let objnw = Object.values(objn[0]);

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
                            Coin.update({ _id: id }, newCoin, { multi: false }, function (err, resp) { 
                                if (err) throw err;        
                                // console.log(newCoin.price);
                            });
                        }
                    }
                }
            })
    
           

    })
    
    }, 10000);

