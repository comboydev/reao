import bcrypt from "bcryptjs";
import mailer from "../utils/mailer";
import {
  registerTempMsg,
  textResetPassword
} from "../config/mail.config";
import db from "../models";
import Utils from "../utils";
import { Role } from "../config/constant";

const config = require("../config");
require('dotenv').config();

const User = db.user;
const EmailActivate = db.emailActivate;

const EXPIRE_TIME = 8;
const FRONT_URL = process.env.FRONT_URL;

const signUp = (req, res) => {
  new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    introducer: req.body.introducer,
  })
    .save()
    .then(async (user) => {
      const ttl = new Date();
      ttl.setHours(ttl.getHours() + EXPIRE_TIME);
      let vToken = Utils.generateToken(user.id);
      const emailActivate = new EmailActivate({
        email: user.email,
        token: vToken,
        ttl: ttl,
        new_email: user.email,
        type: 'verify_email'
      })
      emailActivate.save();             //Save Email Activate for email verification

      const tokenUrl = `${FRONT_URL}/verify/email/${vToken}`;
      const msg = {
        from: config.support_mail, // Sender address
        to: user.email, // List of recipients
        subject: '【FANTATION】　新規会員登録ありがとうございます。', // Subject line
        text: registerTempMsg(tokenUrl), // Plain text body
      };

      try {
        await mailer.sendMail(msg);
        const token = user.generateJwt();
        return res.send({ status_code: 200, user, token });
      } catch {
        console.log("SMTP Error");
        return res.send({ status_code: 500, message: "SMTP Error!" });
      }
    })
    .catch(err => {
      return res.send({
        status_code: 500,
        message: err.message.split(':').slice(-1) || "エラーが発生しました!"
      });
    });
};

const signIn = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    socialAccount: false,
    role: Role.user,
  });
  if (!user) {
    return res.send({ status_code: 400, message: "登録されていないユーザーです。" });
  }
  user.comparePassword(req.body.password, function (err, isMatch) {
    if (isMatch && !err) {
      // if user is found and password is right create a token
      const token = user.generateJwt()
      return res.send({
        status_code: 200,
        token,
        user,
      });
    } else {
      return res.send({
        status_code: 401,
        message: "ログインに失敗しました。10回連続で失敗すると、一定期間ログインできなくなります。"
      });
    }
  });
};

const signUpWithSNS = (req, res) => {
  new User({
    email: req.body.email,
    socialAccount: true,
    emailVerified: true,
  })
    .save()
    .then((user) => {
      const token = user.generateJwt();
      return res.send({ status_code: 200, user, token });
    })
    .catch(err => {
      return res.send({
        status_code: 500,
        message: err.message.split(':').slice(-1) || "エラーが発生しました!"
      });
    });
}

const signInWithSNS = async (req, res) => {
  var user = await User.findOne({
    email: req.body.email,
    socialAccount: true,
  });
  if (!user) {
    return res.send({ status_code: 400, message: "登録されていないユーザーです。" });
  }
  const token = user.generateJwt()
  return res.send({
    status_code: 200,
    token,
    user,
  });
}

const sendLinkOfResetPassword = async (req, res) => {
  //if new_email exists in db, return false;
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        return res.send({ status_code: 400, message: '登録されたメールではありません。' });
      }

      const ttl = new Date();
      ttl.setHours(ttl.getHours() + EXPIRE_TIME);
      let token = Utils.generateToken(user.id);

      EmailActivate.findOneAndUpdate({
        email: user.email,
        type: "reset_password"
      }, {
        token: token,
        ttl: ttl,
        new_email: req.body.new_email
      })
        .exec()
        .then(record => {
          if (!record) {
            const emailActivate = new EmailActivate({
              email: user.email,
              token: token,
              ttl: ttl,
              type: 'reset_password'
            })
            //Save Email Activate for email verification
            emailActivate.save()
          }
        });

      const confirmUrl = `${FRONT_URL}/forgot-password/reset/${token}`;
      let msg = {
        from: config.support_mail, // Sender address
        to: user.email, // List of recipients
        subject: '【FANTATION】　パスワード再設定', // Subject line
        text: textResetPassword(confirmUrl), // Plain text body
      };

      mailer.sendMail(msg)
        .then(() => {
          console.log('success');
          return res.send({
            status_code: 200,
            message: "パスワードリセットリンクを送りしました。",
            token: token
          });
        })
        .catch(err => {
          console.log("SMTP Error:", err);
          return res.status(500).send({ message: 'SMTP Error' });
        })
    })
    .catch(err => {
      return res.status(500).send({ message: 'エラーが発生しました' });
    })
}

const resetPassword = (req, res) => {
  EmailActivate.findOneAndDelete({
    token: req.params.token,
    type: "reset_password"
  }, { returnOriginal: false })
    .then(record => {
      if (!record)
        return res.send({ status_code: 401, message: 'パスワードの再設定が失敗しました。' });

      let ttl = record.ttl;
      if (ttl < new Date())
        return res.send({ status_code: 400, message: 'パスワードの再設定が失敗しました。' });

      User.findOneAndUpdate({
        email: record.email
      }, {
        password: bcrypt.hashSync(req.body.password, 8),
      }, { returnOriginal: false })
        .then(user => {
          return res.send({ status_code: 200, message: 'パスワードの再設定しました!', user: user });
        })
        .catch(error => {
          return res.status(500).send({ message: 'エラーが発生しました' });
        })
    })
    .catch(error => {
      return res.status(500).send({ message: 'エラーが発生しました' });
    })
}

const checkLinkOfResetPassword = (req, res) => {
  EmailActivate.findOne({
    token: req.params.token,
    type: "reset_password"
  })
    .then(record => {
      if (!record)
        return res.send({ status_code: 400 });
      else return res.send({ status_code: 200 });
    })
    .catch(err => {
      return res.send({ status_code: 500 });
    })
}

const sendLinkOfVerifyEmail = async (req, res) => {
  //if new_email exists in db, return false;
  User.findOne({
    email: req.body.new_email
  })
    .then(temp => {
      if (temp && (req.body.new_email != req.body.current_email))
        return res.send({ status_code: 400, message: 'すでに登録されているメールアドレスです。' });
      else {
        User.findOne({
          email: req.body.current_email
        })
          .exec()
          .then(user => {
            if (!user) {
              return res.send({ status_code: 400, message: '登録されたメールではありません。' });
            }

            const ttl = new Date();
            ttl.setHours(ttl.getHours() + EXPIRE_TIME);
            let token = Utils.generateToken(user.id);

            EmailActivate.findOneAndUpdate({
              email: user.email,
              type: "verify_email"
            }, {
              token: token,
              ttl: ttl,
              new_email: req.body.new_email
            })
              .exec()
              .then(record => {
                if (!record) {
                  const email_activate = new EmailActivate({
                    email: user.email,
                    token: token,
                    ttl: ttl,
                    new_email: req.body.new_email,
                    type: 'verify_email'
                  })
                  //Save Email Activate for email verification
                  email_activate.save()
                }
              });

            let confirm_url = `${FRONT_URL}/verify/email/${token}`;
            let msg = {
              from: config.support_mail, // Sender address
              to: req.body.new_email, // List of recipients
              subject: '【FANTATION】　会員登録にお申し込みいただき、ありがとうございます。', // Subject line
              text: registerTempMsg(confirm_url), // Plain text body
            };

            mailer.sendMail(msg)
              .then(() => {
                console.log('success');
                return res.send({
                  status_code: 200,
                  message: "登録したメールアドレスにメール認証確認用URLを送信しました。",
                  token: token
                });
              })
              .catch(err => {
                console.log("SMTP Error:", err);
                return res.status(500).send({ message: 'SMTP Error' });
              })
          })
          .catch(err => {
            return res.status(500).send({ message: 'エラーが発生しました' });
          })
      }
    })
}

const verifyEmail = (req, res) => {
  EmailActivate.findOneAndDelete({
    token: req.params.token,
    type: "verify_email"
  }, { returnOriginal: false })
    .then(record => {
      if (!record)
        return res.send({ status_code: 401, message: 'メールの認証失敗しました。' });

      let ttl = record.ttl;
      if (ttl < new Date())
        return res.send({ status_code: 400, message: '定められた期日が経過したため、メール認証が失敗しました。' });

      User.findOneAndUpdate({
        email: record.email
      }, {
        email: record.new_email,
        emailVerified: true
      }, { returnOriginal: false })
        .then(user => {
          return res.send({ status_code: 200, message: 'メールの認証が完了しました！', user: user });
        })
        .catch(error => {
          return res.status(500).send({ message: 'エラーが発生しました' });
        })
    })
    .catch(error => {
      return res.status(500).send({ message: 'エラーが発生しました' });
    })
}

const changePassword = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        return res.send({
          status_code: 404,
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
          message: "パスワードが正しくありません!"
        });
      }

      User.updateOne({ email: req.body.email }, {
        password: bcrypt.hashSync(req.body.newPassword, 8)
      })
        .exec()
        .then(() => {
          return res.send({
            status_code: 200,
            message: "パスワードを変更しました。"
          })
        })
        .catch((err) => {
          return res.status(500).send(err);
        })
    })
    .catch((err) => {
      return res.status(500).send(err);
    })
}


const withdraw = async (req, res) => {
  try {
    const userId = req.userId
    const count = await User.find({ 'introducer': userId }).countDocuments()
    if (count > 0) {
      return res.send({
        status_code: 400,
        message: 'アフィリエイトの紐づけが崩れるので削除できません。',
      })
    } else {
      await User.findOneAndDelete({ _id: userId })
      return res.send({ status_code: 200 })
    }
  } catch (err) {
    return res.status(500).send({ message: err.toString() })
  }
}



export default {
  signUp,
  signIn,
  signUpWithSNS,
  signInWithSNS,
  sendLinkOfResetPassword,
  resetPassword,
  checkLinkOfResetPassword,
  verifyEmail,
  sendLinkOfVerifyEmail,
  changePassword,
  withdraw,
}