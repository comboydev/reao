import db from "../models";
import { IDVERIFY_STATUS } from "../config/constant";

const User = db.user;

// TODO: add filter, sort, range
const getInfo = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
    .populate(['rewardGroup']);
  return res.json(user);
}

const updatePersonalInfo = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, {
      ...req.body, identityVerified: IDVERIFY_STATUS.default,
    }, { returnOriginal: false });
  return res.send(user);
}

const updateNickname = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id },
    { ...req.body }, { returnOriginal: false });
  return res.send(user);
}

const updateAvatar = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id },
    { ...req.body }, { returnOriginal: false });
  return res.send(user);
}

const updateWarrant = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, {
      ...req.body, identityVerified: IDVERIFY_STATUS.applying,
    }, { returnOriginal: false });
  return res.send(user);
}

// Affiliant 
const getPartners = async (req, res) => {
  let arr = [{ "_id": req.params.id }];
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
  for(let x in records){
    ids.push(records[x]._id);
  }
  return await User
  .find({"introducer": ids})
  .populate(["introducer"])
  .exec()
  .then(res => {
    let temp = [];
    for(let y in res){
      temp.push(res[y]._doc);
    }
    return temp;
  })
}

const updateRewardGroup = async (req, res) => {
  try {
    let id = req.params.id;
    await User.findOneAndUpdate({ _id: id }, { ...req.body });
    const result = await User.findOne({ _id: id }).populate(['rewardGroup'])
    return res.send(result);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "エラーが発生しました!"
    })
  }
}


export default {
  getInfo,
  updatePersonalInfo,
  updateNickname,
  updateAvatar,
  updateWarrant,
  updateRewardGroup,
  getPartners,
}