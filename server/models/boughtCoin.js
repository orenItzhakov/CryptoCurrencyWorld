const mongoose = require('mongoose');

const boughtCoinSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    amount: Number,
    currentPrice: Number,
    Date: Date,
    isActive: Boolean,
    userID: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('BoughtCoin', boughtCoinSchema);