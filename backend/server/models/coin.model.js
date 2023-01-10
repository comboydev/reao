const mongoose = require('mongoose');

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
}, {timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }}
).set('toJSON', {
  virtuals: true
});


module.exports = mongoose.model('Coin', CoinSchema)
