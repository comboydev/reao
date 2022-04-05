import db from "../models";
import config from "../config/config"
import {
  textSupport
} from "../config/mail.config";
import mailer from "./mailer";

const Contact = db.contact;
const User = db.user;

const  create = (req, res) => {
    new Contact({
      name: req.body.name,
      furigana: req.body.furigana,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      title: req.body.title,
      content: req.body.content
    })
    .save()
    .then(() => {
  
      const from = req.body.email;
      const to = config.support_mail;   //'support@fantation-coin.com'
      const subject = req.body.title;
      const text = req.body.content + '\n' + req.body.name + '\n' + req.body.furigana + '\n' + req.body.phoneNumber + '\n' + req.body.phoneNumber;
  
      // send mail
      let msg = {
        from: from,
        to: to,
        subject: subject,
        text: text
      };
      mailer.mailer_reg.sendMail(msg)
      .then(()=>{
        console.log('success');
      })
      .catch(err => {
        console.log('mailer error:', err);
      })
  
      const replyMsg = {
        from: config.support_mail,
        to: from,
        subject: "【FANTATION】　お問い合わせありがとうございます。",
        text: req.body.name + textSupport
      }
  
      mailer.mailer_reg.sendMail(replyMsg)
      .then(()=>{
        console.log('success');
      })
      .catch(err => {
        console.log('mailer error:', err);
      })
  
      return res.send({ status_code: 200, message: '成功しました。'})
    })
    .catch(err => {
        console.log(err);
        return  res.status(500).send(err);
    }) 
}

//Mail(Contact) Management
const getMails = (req, res) => {
  Contact
  .find()
  .sort( { created_at: -1 } )
  .then(data => {
      if(data.length == 0){
        return res.send(data);
      }
      var arr = [];
      data.map(async (d, k)=>{
        await User.findOne({ email: d.email })
        .then(record => {
          d = { ...d._doc, avatar: record?.avatar || '/img/user.png' };
          arr.push(d);
          if(k === (data.length-1))
            return res.send(arr);
        })
      })
  })
  .catch(err => {
    return res.status(500).send({ message: 'error' });
  })
}

const getMailOne = (req, res) => {
  Contact
  .findOne({ _id: req.params.id })
  .then(data => {
      User.findOne({ email: data.email })
      .then(record => {
        data = { ...data._doc, avatar: record?.avatar || '/img/user.png' };
        return res.send(data)
      })
  })
  .catch(err => {
    return res.status(500).send({ message: 'error' });
  })
}

const setStarredMails = (req, res) => {
  let { ids, flag } = req.body;
  Contact.updateMany({ _id: ids }, { starred: flag })
  .then(data => {
    return res.send(data);
  })
  .catch(err => {
    return res.status(500).send(err);
  })
}

const setStarredMailOne = (req, res) => {
  let id = req.params.id;
  let flag = req.body.flag;
  Contact.findOneAndUpdate({ _id: id }, { starred: flag }, {returnOriginal: false})
  .then(data => {
    return res.send(data);
  })
  .catch(err => {
    return res.status(500).send(err);
  })
}

const setDeletedMails = (req, res) => {
  let { ids, flag } = req.body;
  Contact.updateMany({ _id: ids }, { deleted: flag })
  .then(data => {
    return res.send(data);
  })
  .catch(err => {
    return res.status(500).send(err);
  })
}

const setDeletedMailOne = (req, res) => {
  let id = req.params.id;
  let flag = req.body.flag;
  Contact.findOneAndUpdate({ _id: id }, { deleted: flag }, {returnOriginal: false})
  .then(data => {
    return res.send(data);
  })
  .catch(err => {
    return res.status(500).send(err);
  })
}

const deleteMails = (req, res) => {
  let { ids } = req.body;
  Contact.deleteMany({ _id: ids })
  .then(data => {
    return res.send(data);
  })
  .catch(err => {
    return res.status(500).send(err);
  })
}

const sendReplyMail = (req, res) => {
  let { to, subject, content, mail  } = req.body;
  // note replied
  if(mail){
    Contact
      .findOneAndUpdate({ _id: mail._id }, { label: "replied" }).exec();
  }
  // send mail
  
  let msg = {
    from: config.support_mail,
    to: to,
    subject: subject,
    text: mail ? `${mail?.name}様 \n${content}` : content
  };
  mailer.mailer_reg.sendMail(msg)
    .then(()=>{
      return res.send({status_code: 200});
    })
    .catch(err => {
      return res.status(500).send({message: "SMTP ERROR"})
    })
}


export default {
    create,

    getMails,
    getMailOne,
    setStarredMails,
    setStarredMailOne,
    setDeletedMails,
    setDeletedMailOne,
    deleteMails,
    sendReplyMail,
}