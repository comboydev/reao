import bcrypt from "bcryptjs";
import { IdentityStatus } from "../config/constant";
import db from "../models";
import { Role } from "../config/constant";

const User = db.user;

const adminSignIn = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    role: Role.admin,
  });
  if (!user) {
    return res.send({ status_code: 400, message: "登録されていないユーザーです。" });
  }
  user.comparePassword(req.body.password, function (err, isMatch) {
    if (isMatch && !err) {
      // if user is found and password is right create a token
      const token = user.generateJwt()
      return res.send({
        status_code: 200,
        token,
        user,
      });
    } else {
      return res.send({
        status_code: 401,
        message: "ログインに失敗しました。"
      });
    }
  });
};

const changePassword = (req, res) => {
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
        .catch((err) => {
          return res.status(500).send(err);
        })
    })
    .catch((err) => {
      return res.status(500).send(err);
    })
}

const getProfile = async (req, res) => {
  const user = await User.findOne({ _id: req.userId })
  return res.send(user);
}

const updateProfile = async (req, res) => {
  const user = await User.findOneAndUpdate
    ({ _id: req.userId }, { ...req.body }, { returnOriginal: false })
  return res.send(user);
}

//User Management
const getAllUsers = async (req, res) => {
  const users = await User
    .find({ role: 'user' })
    .populate(['introducer'])
    .sort({ created_at: -1 });
  return res.json({ status_code: 200, users: users });
}

const getAffiliaters = async (req, res) => {
  let users = await User
    .find({ role: 'user' })
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
    if ((tear1.length + tear2.length + tear3.length + tear4.length + tear5.length) > 0) {
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

const getPartners = async (req, res) => {
  let arr = [{ _id: req.params.id }];
  let tear1 = await getPartner(arr);
  let tear2 = await getPartner(tear1);
  let tear3 = await getPartner(tear2);
  let tear4 = await getPartner(tear3);
  let tear5 = await getPartner(tear4);
  res.json({
    "tear1": tear1,
    "tear2": tear2,
    "tear3": tear3,
    "tear4": tear4,
    "tear5": tear5
  })
}


const getPartner = async (records) => {
  let ids = [];
  for (let x in records) {
    ids.push(records[x]._id);
  }
  return await User
    .find({ "introducer": ids })
    .exec()
    .then(res => {
      let temp = [];
      for (let y in res) {
        temp.push(res[y]._doc);
      }
      return temp;
    })
}

const getUserOne = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id, role: 'user' })
    .populate(['rewardGroup']);
  return res.send(user);
}

const setConfirmedIdentity = async (req, res) => {
  const user = await User.findOneAndUpdate({
    _id: req.params.id,
  }, { identityVerified: IdentityStatus.verified }, { returnOriginal: false })
  return res.send(user);
}

const setDisableAccount = async (req, res) => {
  const user = await User.findOneAndUpdate({
    _id: req.params.id,
  }, { actived: false }, { returnOriginal: false })
  return res.send(user);
}

const deleteUser = async (req, res) => {
  let id = req.params.id;
  const count = await User.find({ 'introducer': id }).countDocuments()
  if (count === 0) {
    await User.findOneAndDelete({ _id: id });
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
      }, { returnOriginal: false })
    }
  }))
  getAffiliaters(req, res);
}


const updateRewardGroup = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findOneAndUpdate({ _id: userId }, { ...req.body });
    const result = await User.findOne({ _id: userId }).populate(['rewardGroup'])
    return res.send(result);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "エラーが発生しました!"
    })
  }
}

export default {
  adminSignIn,
  changePassword,
  getProfile,
  updateProfile,

  getAllUsers,
  getUserOne,
  getAffiliaters,
  getPartners,
  updateRewardGroup,
  connectUsersToAffiliater,
  setConfirmedIdentity,
  setDisableAccount,
  deleteUser
}