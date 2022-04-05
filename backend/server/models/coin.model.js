const mongoose = require('mongoose');

var OwnerSchema = new mongoose.Schema({
  ownerID: String,
  wallet: String,
  count: Number,
  minCount: {type: Number, default: 1},
  cost: Number,
  sellStatus: {
    type: Number,
    default: -1,            //購入可能状態 -1: impossible    0: appling     1: possible.
  }
}, {timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }}
);

var CoinSchema =  new mongoose.Schema({
  name: String,
  grade: String,
  coinDescription: String,
  gradeDescription: String,
  mainImage: Object,
  totalCount: Number,       //Number Of  coin Ownerships
  minCount: {type: Number, default: 1},  //Number of purchased ownerships
  cost: Number,
  refPrice: Number,
  refImages: Array,
  taxRate: Number,
  owners: [OwnerSchema],
  hashCode: String,
}, {timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }}
).set('toJSON', {
  virtuals: true
});


module.exports = mongoose.model('Coin', CoinSchema)
