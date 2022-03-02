const db = require("../models");
const Sell = db.sell;
const User = db.user;
const Coin = db.coin;

exports.create = async (req, res) => {
  console.log('create', req.body)
  if (!req.body.name && !req.body.issueCount && !req.body.referenceTransactionPrice && !req.body.ownershipPrice) {
    res.status(400).send({ message: "コンテンツを空にすることはできません!" });
  }

  req.body.confirmed = false;
  const sell = new Sell(req.body);

  // validate user_id and coin_id
  await User.findOne({_id: req.body.userId})
    .exec((err, data) => {
    if (err || data == null)
      res.status(500).send({
        message: err.message || "ユーザーが存在しません!"
      });
  });

  await Coin.findOne({_id: req.body.coinId})
    .exec((err, data) => {
    if (err || data == null)
      res.status(500).send({
        message: err.message || "コインが存在しません!"
      });
  });

  // save record
  await sell.save().then(data => {
    res.send({
      message: "購入が正常に登録されました!",
      sell: data
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "購入の作成中にエラーが発生しました!"
    });
  });
};
// TODO: add filter, sort, range
exports.get = (req, res) => {
  Sell
    .find()
    .exec((err, data) => {
      if (!err && data != null) {
        res.header("Access-Control-Expose-Headers", 'Content-Range');
        res.setHeader("Content-Range", '0-' + data.length + '/' + data.length);
        
        return res.status(200).json(data);
      }
      if (!err){
        res.header("Access-Control-Expose-Headers", 'Content-Range');
        res.setHeader("Content-Range", '0-' + 0 + '/' + 0);

        return res.status(200).json([]);
      }
      return res.status(500).send({
        message: err.message || "エラーが発生しました!"
      })
    });
    
}
exports.getOne = (req, res) => {
  Sell
    .findOne({ _id: req.params.id })
    .exec((err, data) => {
      if (!err && data != null) {
        res.status(200).json(data);
      }
    });
}
exports.put = (req, res) => {

  Sell
    .updateOne({ _id: req.body.id }, req.body)
    .exec((err, data) => {
      if (!err && data != null) { console.log('exec', data)
        return res.status(200).json(req.body);
      }
      return res.status(500).send({
        message: err.message || "エラーが発生しました!"
      })
    });
}
exports.delete = (req, res) => {
  Sell
    .deleteOne({ _id: req.params.id })
    .exec((err, data) => {
      if (!err && data != null) {
        return res.status(200).json(data);
      }
      return res.status(500).send({
        message: err.message || "エラーが発生しました!"
      })
    });
}
