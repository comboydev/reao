const mongoose = require('mongoose');

var CoinSchema =  new mongoose.Schema({
  name: String,
  grade: String,
  coinDescription: String,
  gradeDescription: String,
  images: Array,
  refPrice: Number,
}, {timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }}
).set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Coin', CoinSchema)
