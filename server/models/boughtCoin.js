const mongoose = require('mongoose');

const boughtCoinSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    amount: Number,
    currentPrice: Number,
    Date: Date
});

module.exports = mongoose.model('BoughtCoin', boughtCoinSchema);