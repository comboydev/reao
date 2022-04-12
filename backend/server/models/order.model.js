var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  ownership:  {type: mongoose.Schema.Types.ObjectId, ref: 'Ownership'},
  buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  orderCount: Number,
  orderStatus: Number,       //0: Ready, 1: Shipped
  paymentType: Number,       //0: Bank, 1: CreditCard, 2: Crypto
  paymentStatus: Number      //0: none/expired,  1: Pending, 2:Paid  
}, {timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }}
).set('toJSON', {
  virtuals: true
});

module.exports =  mongoose.model('Order', OrderSchema)
