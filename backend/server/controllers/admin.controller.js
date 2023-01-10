import bcrypt from "bcryptjs";
import { _IDVERIFY_STATUS } from "../config/constant";
import db from "../models";

const User = db.user;

const adminSignin = (req, res) => {
  User.findOne({
    email: req.body.email,
    role: "admin"
  })
  .then(user => {
    if (!user) {
      return res.send({ status_code: 400, message: "ログインに失敗しました。" });
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (isMatch && !err) {
        // if user is found and password is right create a token
        var token = user.generateVerificationToken();
        return res.send({
          status_code: 200,
          ...user._doc,
          accessToken: token
        });
      } else {
        return res.send({
          status_code: 401,
          accessToken: null,
          message: "ログインに失敗しました。"
        });
      }
    });
  })
  .catch(err=>{
    if (err.message) {
      let startIdx = err.message.lastIndexOf(':');
      startIdx = startIdx > 0 ? startIdx + 1 : startIdx;
      err.message = err.message.substr(startIdx);
    }
    return res.status(500).send({
      message: err.message || "エラーが発生しました!"
    });
  })
};

const  changePassword = (req, res) => {
  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if (!user) {
      return res.send({ 
        status_code: 404, 
        message: "ユーザーはありません。" 
      });
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.send({
        status_code: 401,
        message: "パスワードが正しくありません!"
      });
    }

    User.updateOne({ email: req.body.email }, {
      password: bcrypt.hashSync(req.body.newPassword, 8)
    })
    .exec()
    .then(() => {
      return res.send({ 
        status_code: 200,
        message: "パスワードを変更しました。" 
      })
    })
    .catch((err)=>{
      return res.status(500).send(err);
    })
  })
  .catch((err)=>{
    return res.status(500).send(err);
  })
}

const updateProfile = (req, res) => {
  const updatedUser = {
    nickname: req.body.nickname,
    avatar: req.body.avatar,
    personalInfo:{
      name: req.body.name,
      furigana: req.body.furigana,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday
    }
  };

  User
    .findOneAndUpdate({ _id: req.body._id }, updatedUser, {returnOriginal: false})
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

const updateAvatar = (req, res) => {
  const updatedUser = {
    avatar: req.body.avatar
  };
  User
    .findOneAndUpdate({ _id: req.body._id }, updatedUser, {returnOriginal: false})
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


//User Management
const getAllUsers = (req, res) => {
  User
    .find({ role: 'user'})
    .populate(['introducer'])
    .sort( { created_at: -1 } )
    .then(data => {
      return res.json({
        status_code: 200,
        users: data,    
      });
    })
    .catch(err => {
      return res.json({
        status_code: 400,
        message: 'error',
      });
    })
}

const getAffiliaters = async (req, res) => {
  let users = await User
    .find({ role: 'user'})
    .populate(['introducer', 'rewardGroup'])
    .sort({ created_at: -1 });
  let data = [];
  await Promise.all(users.map(async (user) => {
    let arr = [{ "_id": user._doc._id }];
    let tear1 = await getPartner(arr);
    let tear2 = await getPartner(tear1);
    let tear3 = await getPartner(tear2);
    let tear4 = await getPartner(tear3);
    let tear5 = await getPartner(tear4);
    if((tear1.length + tear2.length + tear3.length + tear4.length + tear5.length) > 0){
      data = [...data, {
        ...user._doc,
        tear: {
          "tear1": tear1.length,
          "tear2": tear2.length,
          "tear3": tear3.length,
          "tear4": tear4.length,
          "tear5": tear5.length
        }
      }];
    }
  }));
  return res.status(200).json(data);
}

const getPartner = async (records) => {
  let ids = [];
  for(let x in records){
    ids.push(records[x]._id);
  }
  return await User
  .find({"introducer": ids})
  .exec()
  .then(res => {
    let temp = [];
    for(let y in res){
      temp.push(res[y]._doc);
    }
    return temp;
  })
}


const getUserOne = (req, res) => {
  User
    .findOne({
      _id: req.params.id, 
      role: 'user'
    })
    .populate(['rewardGroup'])
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(err => {
        return res.status(500).send();
    })
}

const setConfirmedIdentity = (req, res) => {
  User
    .findOneAndUpdate({ 
      _id: req.params.id,
    },{ identityVerified: _IDVERIFY_STATUS.verified }, {returnOriginal: false})
    .then(record => {
        return res.status(200).json(record);
    })
    .catch(err => {
        return res.status(500).send();
    })
}

const setDisableAccount = (req, res) => {
  User
    .findOneAndUpdate({
      _id: req.params.id,
    },{ actived: false }, {returnOriginal: false})
    .then(record => {
        return res.status(200).json(record);
    })
    .catch(err => {
        return res.status(500).send();
    })
}

const deleteUser = async (req, res) => {
  let id = req.params.id;
  let count = await User.find({ 'introducer': id }).count()
  if (count === 0) {
    await User.findOneAndDelete({_id: id});
    getAllUsers(req, res);
  } else {
    res.json({
      status_code: 400,
      message: 'アフィリエイトの紐づけが崩れるので削除できません。',
    })
  }
}

const connectUsersToAffiliater = async (req, res) => {
  let userEmails = req.body;
  let affiliaterID = req.params.id;
  await Promise.all(userEmails.map(async (email) => {
    let user = await User.find({ 'email': email });
    if (user._id !== affiliaterID && !user.introducer) {
      await User.findOneAndUpdate({ email: email }, {
        introducer: affiliaterID,
      }, {returnOriginal: false})
    }
  }))
  getAffiliaters(req, res);
}




export default {
  adminSignin,
  changePassword,
  updateProfile,
  updateAvatar,

  getAllUsers,
  getUserOne,
  getAffiliaters,
  connectUsersToAffiliater,
  setConfirmedIdentity,
  setDisableAccount,
  deleteUser
}