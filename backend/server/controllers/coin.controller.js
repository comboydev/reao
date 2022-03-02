const db = require("../models");
const Coin = db.coin;

exports.create = async (req, res) => {
  console.log('create', req.body)
  if (!req.body.name && !req.body.issueCount && !req.body.referenceTransactionPrice && !req.body.ownershipPrice) {
    res.status(400).send({ message: "コンテンツを空にすることはできません!" });
  }

  const coin = new Coin(req.body);

  await coin.save().then(data => {
    res.send({
      message: "コインが正常に登録されました!",
      coin: data
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "コインの作成中にエラーが発生しました!"
    });
  });
};
// TODO: add filter, sort, range
exports.get = (req, res) => {
  Coin
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
  Coin
    .findOne({ _id: req.params.id })
    .exec((err, data) => {
      if (!err && data != null) {
        res.status(200).json(data);
      }
    });
}
exports.put = (req, res) => {

  Coin
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
  Coin
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
