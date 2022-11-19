import db from "../models";
import { _SELL_STATUS } from "../config/constant";
const Coin = db.coin;
const Ownership = db.ownership;


const create = async (req, res) => {
  let { extra, ...coinData } = req.body;
  let { coinImages, ownerID, wallet, role } = extra;
  const paths = coinImages.map(image => image.uri)
  let refImages = [...paths];
  let mainImage = refImages.shift();
  try{
    const coin = await new Coin({
      ...coinData,
      mainImage: mainImage,
      refImages: refImages,
    }).save();
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
  } catch(err) {
    res.status(500).send({
      message: "コインの作成中にエラーが発生しました!"
    });
  };
};

const update = async (req, res) => {
  const { extra, ...coinData } = req.body;
  const { coinImages, ownerID, role } = extra;
  const coinId = req.params.id;
  const paths = coinImages.map(image => image.uri)
  let refImages = [...paths];
  let mainImage = refImages.shift();
  try {
    const coin = await Coin.findOne({ _id: coinId });
    await Coin.findOneAndUpdate({ _id: coinId }, {
      ...coinData,
      mainImage: mainImage,
      refImages: refImages,
    });
    res.send({
      message: "コインが正常に登録されました!",
      coin: coin,
    });
  } catch (err) {
    res.status(500).send({
      message: "コインの作成中にエラーが発生しました!"
    });
  };
};

const getAll = async (req, res) => {
  let data = await Coin
    .find()
    .sort( { created_at: -1 } );
  return res.json(data);
}

const getOne = (req, res) => {
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

const bulkDelete = (req, res) => {
  let { ids } = req.body;
  console.log(ids)
  Coin.find({ _id: ids })
  .then(async () => {
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
  update,
  getAll,
  getOne,
  bulkDelete
}