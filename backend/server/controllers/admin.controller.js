var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

import config from "../config/config"
import mailer from "./mailer";
import db from "../models";

const User = db.user;

const adminSignin = (req, res) => {
  console.log(req.body);
  User.findOne({
    email: req.body.email,
    role: "admin"
  })
  .exec()
  .then(user => {
    if (!user) {
      return res.send({ 
        status_code: 400, 
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
        accessToken: null,
        message: "メールアドレスまたはパスワードが正しくありません。"
      });
    }
    
    var token = user.generateVerificationToken();

    return res.send({
      status_code: 200,
      ...user._doc,
      accessToken: token
    });
  })
  .catch(err=>{
    if (err.message) {
      let startIdx = err.message.lastIndexOf(':');
      startIdx = startIdx > 0 ? startIdx + 1 : startIdx;
      err.message = err.message.substr(startIdx);
      console.log("err", err.message);
    }
    return res.status(500).send({
      message: err.message || "エラーが発生しました!"
    });
  })
};


export default {
  adminSignin
}