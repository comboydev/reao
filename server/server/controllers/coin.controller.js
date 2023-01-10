import db from "../models";
const Coin = db.coin;

const create = async (req, res) => {
  try{
    const coin = await new Coin({...req.body}).save();
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
  const coinId = req.params.id;
  try {
    await Coin.findOneAndUpdate({ _id: coinId }, {
      ...req.body,
    });
    const coin = await Coin.findOne({ _id: coinId });
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

const getOne = async (req, res) => {
  const data = await Coin.findOne({ _id: req.params.id });
  res.json(data);
}

const bulkDelete = (req, res) => {
  let { ids } = req.body;
  Coin.find({ _id: ids })
  .then(async () => {
    await Coin.deleteMany({ _id: ids });
    return res.send({status_code: 200});
  })
  .catch(err => {
      return res.status(500).send(err);
  })
}

export default {
  create,
  update,
  getOne,
  bulkDelete
}