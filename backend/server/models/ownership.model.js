const mongoose = require('mongoose');

var OwnershipSchema = new mongoose.Schema({
      coin:  {type: mongoose.Schema.Types.ObjectId, ref: 'Coin'},
      owner:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      wallet: String,
      count: Number,
      minCount: {type: Number, default: 1},
      cost: Number,
      sellStatus: {
            type: Number,
            default: -1,            //購入可能状態 -1: impossible    0: appling     1: possible.
      }
}, {timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }}
).set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Ownership', OwnershipSchema)