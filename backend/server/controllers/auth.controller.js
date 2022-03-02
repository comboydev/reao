var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

import config from "../config/config"
import mailer from "./mailer";
import db from "../models";

const User = db.user;
const Role = db.role;
const EmailActivate = db.email_activate;
const Contact = db.contact;

const FRONT_URL = process.env.FRONT_URL;

const textSignup = `様\n
FANTATIONカスタマーサポートでございます。\n
この度はFANTATIONにご登録いただきありがとうございます。\n
FANTATIONでオーナー権の購入やお取引をいただくには、\n
本人認証が必要となります。\n
マイページにログインいただき、本人認証の手続きをお願い致します。\n
${FRONT_URL}/login\n
ご不明な点がございましたらお気軽にご連絡くださいませ。\n
○●------------------------------------------●○\n
FANTATIONカスタマーサポート\n
Mail：${config.support_mail}\n
LINE：https://lin.ee/AMTD31g\n
URL：${FRONT_URL}/\n
○●------------------------------------------●○`;

const textSupport = `様\n
FANTATIONカスタマーサポートでございます。\n
お問い合わせを受け付けさせていただきました。\n
サポート担当より順次確認の上、土日祝を除く当日～1営業日以内にご回答を差し上げます。\n
ご回答まで今しばらくお待ちくださいませ。\n
○●------------------------------------------●○\n
FANTATIONカスタマーサポート\n
Mail：${config.support_mail}\n
LINE：https://lin.ee/AMTD31g\n
URL：${FRONT_URL}/\n
○●------------------------------------------●○`;

const registerTempMsg = (url) => `この度は、Fantationの会員登録にお申し込みいただき、ありがとうございます。\n
仮登録が完了しました。\n
\n
ご本人様確認のため下記URLにアクセスいただき、本登録を完了させてください。\n
↓↓\n
${url} \n
URLの有効期限は、このメールを受信してから24時間です。\n
有効期限切れとなった場合は仮登録メールを再送信してお手続きをお願いいたします。\n
再送信はサービスにログインのうえ、再度リクエストしてください。\n
${FRONT_URL}/login   \n
\n
※本メールは送信専用です。返信することはできません。\n
※本メールに心当たりのない場合や、ご意見ご質問等は下記へご連絡ください。\n
\n
○●------------------------------------------●○\n
FANTATIONカスタマーサポート\n
Mail：${config.support_mail}\n
LINE：https://lin.ee/AMTD31g\n
URL：${FRONT_URL}/\n
○●------------------------------------------●○
`

const generateGeneralToken = (str) => {
  const verificationToken = jwt.sign(
    { id: str },
    config.secret_private_key,
    { expiresIn: "7d" }
  );
  return verificationToken;
}

const signup = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    status:{
      emailVerified: false
    }
  });

  user.save((err, user) => {
    if (err) {
      if (err.message) {
          let startIdx = err.message.lastIndexOf(':');
          startIdx = startIdx > 0 ? startIdx + 1 : startIdx;
          err.message = err.message.substr(startIdx);
          console.log("err", err.message);
      }
      return res.status(500).send({
        message: err.message || "エラーが発生しました!"
      });
    }

    const ttl = new Date();
    ttl.setHours(ttl.getHours() + 8);
    let token = user.generateVerificationToken();
    const email_activate = new EmailActivate({
      email: user.email,
      token: token,
      ttl: ttl,
      new_email: user.email,
      type: 'verify_email'
    })
    email_activate.save();             //Save Email Activate for email verification
    
    let confirm_url = `${FRONT_URL}/verify/email/${token}`;
    let msg = {
      from: config.support_mail, // Sender address
      to: user.email, // List of recipients
      subject: 'Fantationの会員登録にお申し込みいただき、ありがとうございます。', // Subject line
      text:  registerTempMsg(confirm_url), // Plain text body
    };

    mailer.mailer_reg.sendMail(msg)
    .then(()=>{
      return res.status(200).send({
        message: "仮登録完了しました。\n登録したメールアドレスにメール認証確認用URLを送信しました。",
        token: token
      });
    })
    .catch(err=>{
      console.log("SMTP Error:", err.code);
      return res.status(500).send({
        message: "SMTP Error!",
        token: token
      });
    })
  });

};




const  addMember = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
const  deleteMember = (req, res) => {
  console.log("delete user name", req.params.name)
  User.deleteOne({ username: req.params.name }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
}
// const  editMember = ( req, res) => {
//   console.log("delete user name", req.params.id)
//   User.findOne({username: req.params.id}, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.status(200).json(data)
//     }
//   })
// }

const  editMember = (req, res) => {
  // console.log("delete user name", req.params.id)
  // User.findOne({username: req.params.id}, (error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     res.json(data)
  //   }
  // })
  console.log("edit student is called")
  User
    .findOne({ username: req.params.id })
    .exec((err, data) => {
      if (!err) {
        res.json(data)
      }
    })
}
const  adminLogin = (req, res) => {
  // console.log("request password", bcrypt.hashSync(req.body.password, 8))
  User
    .findOne({ username: req.body.name })
    .exec((err, data) => {
      if (!err) {
        if (data != null) {

          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            data.password
          );

          if (passwordIsValid) {
            res.json("admin")
          }
          else { res.json("user") }

          // bcrypt.compare(req.body.password, data.passwrod, (err,datas) => {
          //   if(error) throw err
          //   if(datas){
          //     return res.status(200).json("admin")
          //   }else{
          //     return res.status(401).json("user")
          //   }
          // })
          // if(!passwordIsValid)
          // console.log("user password", data.password)
          // res.json("admin")
          // else {res.json("user")}
        }
        else {
          res.json("user")
        }
      }
    })
}
const  updateMember = (req, res) => {
  console.log("updatemember is called", req)
  User
    // .findOne({username:req.params.id}) 
    .updateOne({ email: req.body.email }, {
      username: req.body.username,
      furigana: req.body.furigana,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      birthday: req.body.birthday,
      locationProvince: req.body.locationProvince,
      locationCity: req.body.locationCity,
      extra: req.body.extra
    },
      function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
      }
    )
}
const  confirmMember = (req, res) => {
  User.updateOne({ email: req.body.email }, {
    userConfirmed: 1
  },
    function (err, res) {
      if (err) throw err;
      console.log("user confirmed");
    })
}
const  setPersonalInfo = (req, res) => {
  User
    .updateOne({ email: req.body.personalObject.email }, {
      username: req.body.personalObject.username,
      furigana: req.body.personalObject.furigana,
      phoneNumber: req.body.personalObject.phoneNumber,
      email: req.body.personalObject.email,
      birthday: req.body.personalObject.birthday,
      locationProvince: req.body.personalObject.locationProvince,
      locationCity: req.body.personalObject.locationCity,
      extra: req.body.personalObject.extra
    })
    .exec(
      (err, user) => {
        if (err) {
          console.log('personalInfo Error', err)
        }
      });

  User.findOne({ email: req.body.personalObject.email })
    .exec((err, user) => {
      if (!err) {
        console.log('user', user)
        res.status(200).send(user);
      }
    })
}
const  contact = (req, res) => {
  const contact = new Contact({
    username: req.body.username,
    furigana: req.body.furigana,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    title: req.body.title,
    content: req.body.content
  });

  const from = req.body.email;
  const to = 'support@fantation-coin.com';
  //const to = 'kanazawaryostar@gmail.com';
  const subject = req.body.title;
  const text = req.body.content + '\n' + req.body.username + '\n' + req.body.furigana + '\n' + req.body.phoneNumber + '\n' + req.body.phoneNumber;

  // send mail
  let msg = {
    from: from,
    to: to,
    subject: subject,
    text: text
  };
  console.log('msg', msg)
  try {
    mailer.mailer.sendMail(msg, function (err, info) {
      if (err) {
        res.send({
          msg: "error",
        })
        console.log("contact error", err)
      } else {
        // res.send(info)
        res.send({
          msg: "success"
        })
        console.log("contact success", err)
      }

      const replyMsg = {
        from: 'support@fantation-coin.com',
        to: from,
        subject: "FANTATIONお問い合わせありがとうございます。",
        text: req.body.username + textSupport
      }
      console.log('reply', replyMsg)
      mailer.mailer.sendMail(replyMsg, function (err, info) {
        if (err) {
          res.send({
            msg: "error",
          })
          console.log("reply error", err)
        } else {
          // res.send(info)
          res.send({
            msg: "success"
          })
          console.log("reply success", err)
        }
      })
    });
  } catch (ex) {
    console.log('sendMail', ex)
  }
  contact.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });
}
const  uploadImage = (req, res) => {
  User.updateOne({ email: req.body.personalObject.email }, {
    filePath: req.body.personalObject.filePath
  }).exec((err, user) => {
    if (err) {
      console.log('uploadImage Error', err)
    }
  });
}
const  uploadID = (req, res) => {
  User.updateOne({ email: req.body.personalObject.email }, {
    fileID: req.body.personalObject.filePath,
    userConfirmed: 0
  }).exec((err, user) => {
    if (err) {
      console.log('uploadImage Error', err)
    }
  });
}
const  getPersonalInfo = (req, res) => {
  User
    .findOne({ email: req.params.email })
    .exec((err, data) => {
      if (!err && data != null)
        res.json("user");
    });
}
const  changePassword = (req, res) => {
  console.log('change', req.body)
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "ユーザーはありません。" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "パスワードが正しくありません!"
        });
      }

      User.updateOne({ email: req.body.email },
        {
          password: bcrypt.hashSync(req.body.newPassword, 8)
        })
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (!user) {
            return res.status(404).send({ message: "ユーザーはありません。" });
          }
          return res.status(200).send({ message: "パスワードを変更しました。" })
        })
    })
}
const  quit = (req, res) => {
  User.updateOne({
    email: req.body.email
  }, { quitConfirmed: 0 })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "ユーザーはありません。" });
      }
    })
}


const signin = (req, res) => {
  console.log(req.body);
  User.findOne({
    email: req.body.email,
    role: "user"
  })
  .exec()
  .then(user => {
    if (!user) {
      return res.send({ status_code: 400, message: "ユーザーはありません。" });
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

    var token = generateGeneralToken(user.id);

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

const verifyEmail = (req, res) => {
  EmailActivate.findOneAndDelete({
    token: req.body.token,
    type: "verify_email"
  })
  .exec()
  .then( record => {
    if(!record)
      return res.send({ status_code: 401, message: 'メール認証失敗しました。' });

    let ttl = record.ttl;
    if(ttl < new Date()) 
      return res.send({ status_code: 400, message: 'メール認証失敗しました。' });

    User.updateOne({ 
      email: record.email 
    }, { 
      email: record.new_email,
      status: {
        emailVerified: true
      } 
    })
    .exec()
    .then(user => {
      return res.send({ status_code: 200, message: 'success', email: record.new_email });
    })
    .catch(error => {
      return res.status(500).send({ message: 'エラーが発生しました' });
    })
  })
  .catch( error => {
    return res.status(500).send({ message: 'エラーが発生しました' });
  })
}

const sendLinkOfVerifyEmail = async (req, res) => {

  //if new_email exists in db, return false;
  User.findOne({
    email: req.body.new_email
  })
  .exec()
  .then(temp => {
    if(temp && (req.body.new_email != req.body.current_email))
      return res.send({ status_code: 400, message: 'すでに登録されているメールアドレスです。' });
    else{
      User.findOne({
        email: req.body.current_email
      })
      .exec()
      .then(user => {
        if(!user){
          return res.send({ status_code: 400, message: '失敗しました。' });
        }
    
        const ttl = new Date();
        ttl.setHours(ttl.getHours() + 8);
        let token = user.generateVerificationToken();
    
        EmailActivate.findOneAndUpdate({
          email: user.email,
          type: "verify_email"
        },{ 
          token: token,
          ttl: ttl,
          new_email: req.body.new_email
          })
        .exec()
        .then(record => {
          if(!record){
            const email_activate = new EmailActivate({
              email: user.email,
              token: token,
              ttl: ttl,
              new_email: req.body.new_email,
              type: 'verify_email'
            })
            email_activate.save();             //Save Email Activate for email verification
          }
        });
    
        let confirm_url = `${FRONT_URL}/verify/email/${token}`;
        let msg = {
          from: config.support_mail, // Sender address
          to: req.body.new_email, // List of recipients
          subject: 'Fantationの会員登録にお申し込みいただき、ありがとうございます。', // Subject line
          text:  registerTempMsg(confirm_url), // Plain text body
        };
    
        mailer.mailer_reg.sendMail(msg)
        .then(()=>{
          return res.send({
            status_code: 200,
            message: "登録したメールアドレスにメール認証確認用URLを送信しました。",
            token: token
          });
        })
        .catch(err=>{
          console.log("SMTP Error:", err.code);
          return res.status(500).send({
            message: "SMTP Error!",
            token: token
          });
        })
      })
      .catch(error => {
        return res.status(500).send({ message: 'エラーが発生しました' });
      })
    }
  })
}


export default {
  signup,
  signin,
  changePassword,
  verifyEmail,
  sendLinkOfVerifyEmail,

  addMember,
  deleteMember,
  editMember,
  adminLogin,
  updateMember,
  confirmMember,
  setPersonalInfo,
  contact,
  uploadImage,
  uploadID,
  getPersonalInfo,
  quit
}