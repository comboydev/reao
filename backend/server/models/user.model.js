var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
var config = require('../config/config');

var personalSchema = new Schema({
  name: String,
  furigana: String,
  phoneNumber: String,
  birthday: Date,
  locationProvince: String,
  locationCity: String,
  extra: String,
  warrant: String                //証明書
});

var statusSchema = new Schema({
  sms: { type: Boolean, required: true, default: false },
  emailVerified: { type: Boolean, required: true, default: false },
  identityVerified: { type: Number, required: true, default: -1  },         //1 => verified, 0 => apply now, -1 => no ID 
  quitConfirmed: { type: Number, required: true, default: -1 },
})


var UserSchema = new Schema({
  id: String,
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
  avatar: String,
  personalInfo: personalSchema,
  status: statusSchema,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  coins: String,
}, 
{
  timestamps:{ 
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
}
}).set('toJSON', {
  virtuals: true
});


UserSchema.methods.generateVerificationToken = function () {
  const user = this;
  const verificationToken = jwt.sign(
      { ID: user._id },
      config.default.secret_private_key,
      { expiresIn: "7d" }
  );
  return verificationToken;
};



module.exports =  mongoose.model('User', UserSchema)