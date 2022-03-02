const db = require("../models");
const News = db.news;

exports.create = async (req, res) => {
  console.log('create', req.body)
  if (!req.body.newsDate && !req.body.content) {
    res.status(400).send({ message: "コンテンツを空にすることはできません!" });
  }

  const news = new News({
    newsDate: req.body.newsDate,
    content: req.body.content
  });

  // TODO: prevent duplicate mail
  await news.save().then(data => {
    res.send({
      message: "ニュースが正常に登録されました!",
      news: data
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "ニュースの作成中にエラーが発生しました!"
    });
  });
};
// TODO: add filter, sort, range
exports.get = (req, res) => {
  News
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
  News
    .findOne({ _id: req.params.id })
    .exec((err, data) => {
      if (!err && data != null) {
        res.status(200).json(data);
      }
    });
}
exports.put = (req, res) => {
  const updatedNews = {
    id: req.body.id,
    newsDate: req.body.newsDate,
    content: req.body.content
  };

  News
    .updateOne({ _id: req.body.id }, updatedNews)
    .exec((err, data) => {
      if (!err && data != null) { console.log('exec', data)
        return res.status(200).json(updatedNews);
      }
      return res.status(500).send({
        message: err.message || "エラーが発生しました!"
      })
    });
}
exports.delete = (req, res) => {
  News
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
