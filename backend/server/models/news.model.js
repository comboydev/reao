import mongoose from 'mongoose'

const News = mongoose.model(
  "News",
  new mongoose.Schema({
    newsDate: Date,
    content: String
  }).set('toJSON', {
    virtuals: true
})
);

export default News;
