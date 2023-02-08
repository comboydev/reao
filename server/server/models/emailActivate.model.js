var config = require('../config');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var EmailActivateSchema = new Schema({
  email: String,
  ttl: Date,
  token: String,
  new_email: String,
  type: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
).set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Email_Activate', EmailActivateSchema)