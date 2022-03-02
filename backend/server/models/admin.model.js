var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var config = require('../config/config');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      isAsync: true,
      validator: function (value, isValid) {
        const self = this;
        return self.constructor.findOne({ email: value })
          .exec(function (err, user) {
            if (err) {
              throw err;
            }
            else if (user) {
              if (self.id === user.id) {  // if finding and saving then it's valid even for existing email
                return isValid(true);
              }
              return isValid(false);
            }
            else {
              return isValid(true);
            }

          })
      },
      message: 'このメールアドレスは既に登録されています!'
    },
  },
  password: String,
  role: {
    type: String,
    default: 'admin'
  }
}, {timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }}
).set('toJSON', {
  virtuals: true
});


AdminSchema.methods.generateVerificationToken = function () {
  const admin = this;
  const verificationToken = jwt.sign(
      { ID: admin._id },
      config.default.secret_private_key,
      { expiresIn: "7d" }
  );
  return verificationToken;
};

module.exports =  mongoose.model('Admin', AdminSchema)