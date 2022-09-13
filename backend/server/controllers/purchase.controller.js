import db from "../models";
import { _SELL_STATUS, _PAYMENT_TYPE, _PAYMENT_STATUS, _ORDER_STATUS } from "../config/constant";
const Coin = db.coin;
const Ownership = db.ownership;
const Order = db.order;


const createOrder = async (req, res) => {
  let ownershipID = req.body.ownershipID;
  let buyerID = req.body.buyerID;
  
  Order
    .findOne({
      ownership: ownershipID,
      buyer: buyerID
    })
    .then(record =>{
      if(record){
        return res.send({ status_code: 401, message: "すでにこのオーナー券を注文しました!"})
      } 
        new Order({
          ...req.body,
          ownership: ownershipID,
          buyer: buyerID,
          orderStatus: _ORDER_STATUS.applying,
          paymentStatus: _PAYMENT_STATUS.pending,
        })
        .save()
        .then(order => {
          res.send({ status_code: 200, order: order, message: "注文完了しました!" });
        })
    })
    .catch(err => {
      res.status(500).send({
        message: "エラーが発生しました!"
      });
    });
};


const getAllOrders = async (req, res) => {
  let orders = await Order
    .find()
    .populate(["ownership", "buyer"])
    .sort( { created_at: -1 } );
  
  let resData = [];
    orders.map( async (order, k) => {
        let coin = await Coin.findById(order.ownership.coin);
        resData.push({ ...order._doc, coin: coin });
          if(k === orders.length - 1){
            return res.json(resData);
          }
    })
  if(orders.length === 0) return res.json([]);
}


const getOrderOne = (req, res) => {
  // Order
  // .findOne({ _id: req.params.id })
  // .then(async coin => {
  //     await Ownership
  //       .find({ coinID: req.params.id })
  //       .then(owners => {
  //         coin = {...coin._doc, owners: owners };
  //         return res.json(coin)
  //       })
  // })
  // .catch(err => {
  //   return res.status(500).send(err);
  // })
}


const deleteOrders = (req, res) => {
  let { ids } = req.body;
  Order.find({ _id: ids })
  .then(async () => {
    //Delete records in Database
    await Order.deleteMany({ _id: ids });
    return res.send({status_code: 200});
  })
  .catch(err => {
      return res.status(500).send(err);
  })
}


export default {
  createOrder,

  getAllOrders,
  getOrderOne,
  deleteOrders
}