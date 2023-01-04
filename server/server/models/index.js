import mongoose from 'mongoose'

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.bank = require("./bank.model");
db.emailActivate = require("./emailActivate.model");
db.contact = require("./contact.model");
db.coin = require("./coin.model");
db.order = require("./order.model");
db.rewardGroup = require("./rewardGroup.model");

export default db;