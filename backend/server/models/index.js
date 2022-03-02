import mongoose from 'mongoose'

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.admin = require("./admin.model");
db.user = require("./user.model");
db.email_activate = require("./email_activate.model");
db.role = require("./role.model");
db.contact = require("./contact.model");
db.news = require("./news.model");
db.coin = require("./coin.model");
db.order = require("./order.model");
db.purchase = require("./purchase.model");
db.sell = require("./sell.model");

db.ROLES = ["user", "admin", "moderator"];

export default db;