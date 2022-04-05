import db from "../models";
import { _IDVERIFY_STATUS } from "../config/constant";

const User = db.user;

// TODO: add filter, sort, range
const get = (req, res) => {
  User
    .findOne({
      _id: req.params.id
    })
    .exec()
    .then((record) => {
        return res.json(record);
    }).catch(err => {
      return res.status(500).send();
    });
    
}

const update = (req, res) => {
  const updatedUser = {
    personalInfo:{
      name: req.body.name,
      furigana: req.body.furigana,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday,
      locationProvince: req.body.locationProvince,
      locationCity: req.body.locationCity,
      extra: req.body.extra,
    },
    identityVerified: _IDVERIFY_STATUS.default
  };

  User
    .findOneAndUpdate({ _id: req.body.id }, updatedUser, {returnOriginal: false})
    .exec()
    .then(record => {
      return res.send(record);
    })
    .catch(err=>{
      return res.status(500).send({
        message: err.message || "エラーが発生しました!"
      })
    });
}


const updateNickname = (req, res) => {
  const updatedUser = {
    nickname: req.body.nickname
  };
  User
    .findOneAndUpdate({ _id: req.body.id }, updatedUser, {returnOriginal: false})
    .exec()
    .then(record => {
      return res.send(record);
    })
    .catch(err=>{
      return res.status(500).send({
        message: err.message || "エラーが発生しました!"
      })
    });
}

const updateUserAvatar = (req, res) => {
  const updatedUser = {
    avatar: req.body.avatar
  };
  User
    .findOneAndUpdate({ _id: req.body.id }, updatedUser, {returnOriginal: false})
    .exec()
    .then(record => {
      return res.send(record);
    })
    .catch(err=>{
      return res.status(500).send({
        message: err.message || "エラーが発生しました!"
      })
    });
}

const updateUserWarrant = (req, res) => {
  const updatedUser = {
    warrant: req.body.warrant,
    identityVerified: _IDVERIFY_STATUS.applying
  };
  User
    .findOneAndUpdate({ _id: req.body.id }, updatedUser, {returnOriginal: false})
    .exec()
    .then(record => {
      return res.send(record);
    })
    .catch(err=>{
      return res.status(500).send({
        message: err.message || "エラーが発生しました!"
      })
    });
}


export default {
  get,
  update,
  updateNickname,
  updateUserAvatar,
  updateUserWarrant,
}