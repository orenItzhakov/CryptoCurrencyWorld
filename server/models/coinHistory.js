const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const coinHistoryPriceTimeSchema = mongoose.Schema({
    price: Number,
    date: Number,  // Unix time
    coinHistory: {type: Schema.Types.ObjectId, ref: 'coinHistory'},
});

mongoose.model('coinHistoryPriceTime', coinHistoryPriceTimeSchema);

const coinHistorySchema = mongoose.Schema({
    name : String,
    shortName : String,
    coinHistoryPriceTime: [{type: Schema.Types.ObjectId, ref: 'coinHistoryPriceTime'}]
});

let coinHistory = mongoose.model('coinHistory', coinHistorySchema);
module.exports = coinHistory;