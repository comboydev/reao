import mongoose from 'mongoose'

const Purchase = mongoose.model(
  "Purchase",
  new mongoose.Schema({
    coinId: String,
    userId: String,
    count: Number,
    date: String,
  }).set('toJSON', {
    virtuals: true
  })
);

export default Purchase;
