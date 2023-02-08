import db from "../models";
const Bank = db.bank;

const updateOrCreate = async (req, res) => {
  const bank = await Bank.findOne({ userId: req.userId })
  if (!bank) {
    await new Bank({ ...req.body, userId: req.userId }).save();
    return res.send({ status_code: 200, message: '銀行情報を変更しました!' });
  } else {
    Bank.findOneAndUpdate({ userId: req.userId }, { ...req.body }
    ).then(() => {
      return res.send({ status_code: 200, message: '銀行情報を変更しました!' })
    })
  }
};

const get = async (req, res) => {
  const bank = await Bank.findOne({ userId: req.userId })
  return res.send(bank);
}

export default {
  updateOrCreate,
  get,
}