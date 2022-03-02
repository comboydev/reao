import mongoose from 'mongoose'

const Order = mongoose.model(
  "Order",
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

export default Order;
