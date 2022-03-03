const User = require("../models/user.model");
var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");
const mailer = require("./mailer");
const API_URL = process.env.API_URL;


// TODO: add filter, sort, range
exports.get = (req, res) => {
  User
    .find()
    .exec((err, data) => {
      if (!err && data != null) {
        res.header("Access-Control-Expose-Headers", 'Content-Range');
        res.setHeader("Content-Range", '0-' + data.length + '/' + data.length);
        
        res.status(200).json(data);
      }
    });
    
}
exports.getOne = (req, res) => {
  User
    .findOne({ _id: req.params.id }).lean()
    .exec((err, data) => {
      if (!err && data != null) {
        data['id'] = data['_id']
        if (data.fileID){
          data['url'] = `${API_URL}download/` + data.fileID.substr(data.fileID.lastIndexOf('\\') + 1)
          console.log('data--', data)
        }
        
        res.status(200).json(data);
      }
    });
}
exports.put = (req, res) => {console.log('put', req.body)
  const updatedUser = {
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    furigana: req.body.furigana,
    phoneNumber: req.body.phoneNumber,
    birthday: req.body.birthday,
    locationProvince: req.body.locationProvince,
    locationCity: req.body.locationCity,
    extra: req.body.extra,
    userConfirmed: req.body.userConfirmed,
    quitConfirmed: req.body.quitConfirmed
  };

  User
    .updateOne({ _id: req.body.id }, updatedUser)
    .exec((err, data) => {
      if (!err && data != null) { console.log('exec', data)
        return res.status(200).json(updatedUser);
      }
      return res.status(500).send({
        message: err.message || "エラーが発生しました!"
      })
    });
}
exports.delete = (req, res) => {
  User
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
exports.orders = (req, res) => {
  User
    .find({ confirmed: true })
    .exec((err, data) => {
      if (!err && data != null) {
        res.header("Access-Control-Expose-Headers", 'Content-Range');
        res.setHeader("Content-Range", '0-' + data.length + '/' + data.length);
        
        res.status(200).json(data);
      }
    });
}
exports.sells = (req, res) => {
  User
    .find({ confirmed: true })
    .exec((err, data) => {
      if (!err && data != null) {
        res.header("Access-Control-Expose-Headers", 'Content-Range');
        res.setHeader("Content-Range", '0-' + data.length + '/' + data.length);
        
        res.status(200).json(data);
      }
    });
}