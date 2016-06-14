'use strict';
let mongoose = require('mongoose');

let resultSchema = new mongoose.Schema({
  resultUrl: String,
  attendees: [String]
});

module.exports = mongoose.model('Result', resultSchema);