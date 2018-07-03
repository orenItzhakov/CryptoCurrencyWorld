const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const coinHistoryDataSchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId,
    price: Number,
    date: Number,  // Unix time
    // coinHistory: {type: Schema.Types.ObjectId, ref: 'CoinHistory'},
});

const coinHistorySchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId,
    name : String,
    shortName : String,
    // coinHistoryData: [{type: Schema.Types.ObjectId, ref: 'coinHistoryData'}]
    coinHistoryData: [coinHistoryDataSchema]
});


module.exports = mongoose.model('coinHistory', coinHistorySchema, 'coinHistory');

