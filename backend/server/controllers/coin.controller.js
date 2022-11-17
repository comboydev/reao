import db from "../models";
import { _SELL_STATUS } from "../config/constant";
const Coin = db.coin;
const Ownership = db.ownership;


const create = async (req, res) => {
  let { extra, ...coinData } = req.body;
  let { coinImages, ownerID, wallet, role } = extra;
  let paths = [];
  coinImages.map((img, k) => {
    paths.push(img.uri);
  })
  let refImages = [...paths];
  let mainImage = refImages.shift();
  
  
  new Coin({
    ...coinData,
    mainImage: mainImage,
    refImages: refImages,
  })
  .save().then(async coin =>{
    let sellStatus;
    if(role === 'admin') sellStatus = _SELL_STATUS.available;
    else sellStatus = _SELL_STATUS.default;
    let ownership = { 
      coin: coin._id,
      owner: ownerID, 
      wallet: wallet, 
      count: coinData.totalCount, 
      cost: coinData.cost, 
      sellStatus: sellStatus  
    };
    await new Ownership(ownership).save();

    res.send({
      message: "コインが正常に登録されました!",
      coin: coin
    });
  }).catch(err => {
    res.status(500).send({
      message: "コインの作成中にエラーが発生しました!"
    });
  });
};


const getAllCoins = async (req, res) => {
  let data = await Coin
    .find()
    .sort( { created_at: -1 } );
  return res.json(data);
}


const getCoinOne = (req, res) => {
  Coin
  .findOne({ _id: req.params.id })
  .then(async coin => {
      await Ownership
        .find({ coin: req.params.id })
        .populate(['owner'])
        .then(owners => {
          coin = {...coin._doc, owners: owners };
          return res.json(coin)
        })
  })
  .catch(err => {
    return res.status(500).send(err);
  })
}


const deleteCoins = (req, res) => {
  let { ids } = req.body;
  Coin.find({ _id: ids })
  .then(async () => {
    //Delete records in Database
    await Coin.deleteMany({ _id: ids });
    await Ownership.deleteMany({ coin: ids });
    return res.send({status_code: 200});
  })
  .catch(err => {
      return res.status(500).send(err);
  })
}


export default {
  create,

  getAllCoins,
  getCoinOne,
  deleteCoins
}