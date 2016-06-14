'use strict';
let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  twitterID: String
});

module.exports = mongoose.model('User', userSchema);