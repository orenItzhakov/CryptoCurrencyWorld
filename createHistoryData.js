
const mongoose = require('mongoose');
const coinHistory = require('./server/models/coinHistory');
const coinHistoryData = require('./server/models/coinHistoryData')

mongoose.connect('mongodb://CCW:Aiagm100p@ds219181.mlab.com:19181/crypto_currency_world');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// var newCoinHistoryData = new coinHistoryData({
//   // _id: new mongoose.Types.ObjectId(),
//   price: 7777,
//   date: 1529539200, 
// });
  

let cryptoArray = [ "BTC","ETH","XRP","BCH","EOS","LTC","XLM","ADA","USDT","IOT","TRX","XMR","NEO","DASH","BNB","ETC","VEN","XEM","ONT","QTUM" ]

let newCoinHistory
for(i=0;i<cryptoArray.length;i++){

  newCoinHistory = new coinHistory({
    // _id: new mongoose.Types.ObjectId(),
    name: '',
    shortName: cryptoArray[i],
    coinHistoryData: []
  });
  
  newCoinHistory.save()

}





// newCoinHistoryData.save()
  // if (err) return handleError(err);

 
  // newCoinHistoryData.save()



// let BTC = new coinHistory({
//   name: "Bitcoin",
//   shortName: "BTC",
//   coinHistoryData: []
// });

// let BTChistoryData = new coinHistoryData({
//   price: "6666",
//   data: "1529539200",
  
// });

// BTChistoryData.save((err,result)=>{
//     if(err){
//       console.log(err)
//     }
//     console.log(result)
//   });;

// BTC[coinHistoryData].push(BTChistoryData);

// BTC.save((err,result)=>{
//     if(err){
//       console.log(err)
//     }
//     console.log(result)
//   });