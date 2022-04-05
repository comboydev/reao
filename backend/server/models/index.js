import mongoose from 'mongoose'

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.bank = require("./bank.model");
db.email_activate = require("./email_activate.model");
db.contact = require("./contact.model");
db.coin = require("./coin.model");
db.order = require("./order.model");
db.purchase = require("./purchase.model");

export default db;