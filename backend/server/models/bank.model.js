var mongoose = require('mongoose');

var BankSchema = new mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  bankName: String,            //金融機関名
  bankCode: String,            //銀行コード
  bankBranch: String,          //支店名
  bankBranchCode: String,      //支店番号
  bankAccountNumber: String,   //口座番号
  bankAccountName: String,     //口座名義人
}, {timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }}
).set('toJSON', {
  virtuals: true
});

module.exports =  mongoose.model('Bank', BankSchema)
