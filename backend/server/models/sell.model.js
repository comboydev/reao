import mongoose from 'mongoose'

const Sell = mongoose.model(
  "Sell",
  new mongoose.Schema({
    coinId: String,
    userId: String,
    count: Number,
    date: String,
    confirmed: Boolean
  }).set('toJSON', {
    virtuals: true
  })
);

export default Sell;
