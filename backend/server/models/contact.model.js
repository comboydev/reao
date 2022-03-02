import mongoose from 'mongoose'

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    username: String,
    furigana: String,
    phoneNumber: String,
    email: String,
    title: String,
    content: String
  })
);

export default Contact;
