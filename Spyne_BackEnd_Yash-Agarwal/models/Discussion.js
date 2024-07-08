const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  image: { type: String },
  hashtags: [{ type: String }],
  createdOn: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  viewCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Discussion', discussionSchema);
