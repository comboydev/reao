var mongoose = require('mongoose');

var RewardGroupSchema = new mongoose.Schema({
  name: String,
  tear1: Number,
  tear2: Number,
  tear3: Number,
  tear4: Number,
  tear5: Number,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
).set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Reward_Group', RewardGroupSchema);
