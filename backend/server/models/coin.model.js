import mongoose from 'mongoose'

const Coin = mongoose.model(
  "Coin",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      validate: {
        isAsync: true,
        validator: function (value, isValid) {
          const self = this;
          return self.constructor.findOne({ name: value })
            .exec(function (err, coin) {
              if (err) {
                throw err;
              }
              else if (coin) {
                if (self.id === coin.id) {  // if finding and saving then it's valid even for existing name
                  return isValid(true);
                }
                return isValid(false);
              }
              else {
                return isValid(true);
              }

            })
        },
        message: 'このコイン名は既に登録されています!'
      },
    },
    grade: String,
    issueCount: Number,
    referenceTransactionPrice: Number,
    ownershipPrice: Number,
    date: String,
    material: String,
    diameter: String,
    weight: String,
    auctionWinningBidCount: Number,
    auctionWinningBidRate: Number
  }).set('toJSON', {
    virtuals: true
  })
);

export default Coin;
