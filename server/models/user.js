const mongoose = require('mongoose');
var Schema = mongoose.Schema;
//const BoughtCoin = require('./boughCoin');

const boughtCoinSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    amount: Number,
    currentPrice: Number,
    Date: Date,
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    isActive: Boolean
});

var Transaction = mongoose.model("boughtCoin", boughtCoinSchema);

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    firstName : String,
    lastName: String,
    email: String,
    balance: Number,
    coins: [{type: Schema.Types.ObjectId, ref: 'boughtCoin'}]
});
let User = mongoose.model('user', userSchema);
module.exports = User;