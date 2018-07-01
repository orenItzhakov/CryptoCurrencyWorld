const mongoose = require('mongoose');
const User = require('./user');
var Schema = mongoose.Schema;

const detailsSchema = mongoose.Schema({
    user_id : mongoose.Schema.Types.ObjectId,
    username : String,
    password : String
})

module.exports = mongoose.model('detail', detailsSchema);