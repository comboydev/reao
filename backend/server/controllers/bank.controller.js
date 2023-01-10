import db from "../models";

const Bank = db.bank;


const updateBankInfo = async (req, res) => {
  Bank.findOne({ userID: req.body.userID })
  .then(record => {
    if(!record){
      Bank.create({...req.body}).then(()=>{
        return res.send({ status_code: 200, message:'銀行情報を変更しました!' })
      })
    } else {
      Bank.findOneAndUpdate({
        userID: req.body.userID
      }, {
        ...req.body
      }
      ).then(()=>{
        return res.send({ status_code: 200, message:'銀行情報を変更しました!' })
      })
    }
  })
  .catch(err=>{
    return res.status(500).send({
      message: err.message || "エラーが発生しました!"
    })
  });
};


const getBankInfo = async (req, res) => {
  Bank.findOne({ userID: req.params.userID })
  .then(record => {
    return res.send(record)
  })
  .catch(err=>{
    return res.status(500).send({
      message: err.message || "エラーが発生しました!"
    })
  });
}

export default {
  updateBankInfo,
  getBankInfo,
}