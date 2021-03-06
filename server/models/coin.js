const mongoose = require('mongoose');

const coinSchema = mongoose.Schema({
    name : String,
    shortName : String,
    price: Number,
    market_cap: Number,
    volume : Number,
    change: Number,
    circulating_supply: Number
});

module.exports = mongoose.model('Coin', coinSchema);