const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const coinHistoryDataSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    price: Number,
    date: Number,  // Unix time
    coinHistory: {type: Schema.Types.ObjectId, ref: 'CoinHistory'},
});

module.exports = mongoose.model('coinHistoryData', coinHistoryDataSchema, 'coinHistoryData');