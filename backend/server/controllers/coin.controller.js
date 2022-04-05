import db from "../models";
import { _SELL_STATUS } from "../config/constant";
const Coin = db.coin;


const create = async (req, res) => {
  let { extra, ...coinData } = req.body;
  let { coinImages, ownerID, wallet, role } = extra;
  let paths = [];
  coinImages.map((img, k) => {
    paths.push(img.uri);
  })
  let refImages = [...paths];
  let mainImage = refImages.shift();
  
  let arr = [];
  let sellStatus;
  if(role === 'admin') sellStatus = _SELL_STATUS.available;
  else sellStatus = _SELL_STATUS.default;
  arr.push({ 
    ownerID: ownerID, 
    wallet: wallet, 
    count: coinData.totalCount, 
    cost: coinData.cost, 
    sellStatus: sellStatus  
  });
  new Coin({
    ...coinData,
    mainImage: mainImage,
    refImages: refImages,
    owners: arr,
  })
  .save().then(data => {
    res.send({
      message: "コインが正常に登録されました!",
      coin: data
    });
  }).catch(err => {
    res.status(500).send({
      message: "コインの作成中にエラーが発生しました!"
    });
  });
};


const getAllCoins = (req, res) => {
  Coin
    .find()
    .sort( { created_at: -1 } )
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(500).send({ message: 'error'});
    })
}


const getCoinOne = (req, res) => {
  Coin
  .findOne({ _id: req.params.id })
  .then(data => {
      return res.json(data)
  })
  .catch(err => {
    return res.status(500).send(err);
  })
}


const deleteCoins = (req, res) => {
  let { ids } = req.body;
  Coin.find({ _id: ids })
  .then(coins => {
    //Delete records in Database
    Coin.deleteMany({ _id: ids })
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(err);
    })
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