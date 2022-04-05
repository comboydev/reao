var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  coin:  {type: mongoose.Schema.Types.ObjectId, ref: 'Coin'},
  seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  count: Number,
  orderStatus: String,       //Ready, Shipped
  paymentType: String,       //Bank, CreditCard, Crypto
  paymentStatus: String      //Pending, Expired, Paid
}, {timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }}
).set('toJSON', {
  virtuals: true
});

module.exports =  mongoose.model('Order', OrderSchema)
