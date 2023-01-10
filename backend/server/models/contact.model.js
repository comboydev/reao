var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
  name: String,
  furigana: String,
  phoneNumber: String,
  email: String,
  title: String,
  content: String,
  starred: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'new'     //new, replied
  }
}, {timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }}
).set('toJSON', {
  virtuals: true
});

module.exports =  mongoose.model('Contact', ContactSchema)
