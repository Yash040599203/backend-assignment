const Discussion = require('../models/Discussion');
const User = require('../models/User');

exports.createDiscussion = async (req, res) => {
  try {
    const { text, image, hashtags, userId } = req.body;
    const discussion = new Discussion({ text, image, hashtags, user: userId });
    await discussion.save();
    res.status(201).send(discussion);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!discussion) {
      return res.status(404).send();
    }
    res.send(discussion);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndDelete(req.params.id);
    if (!discussion) {
      return res.status(404).send();
    }
    res.send(discussion);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.listDiscussionsByTags = async (req, res) => {
  try {
    const discussions = await Discussion.find({ hashtags: { $in: req.query.tags.split(',') } });
    res.send(discussions);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.listDiscussionsByText = async (req, res) => {
  try {
    const discussions = await Discussion.find({ text: new RegExp(req.query.text, 'i') });
    res.send(discussions);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.viewDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).send();
    }
    discussion.viewCount += 1;
    await discussion.save();
    res.send(discussion);
  } catch (error) {
    res.status(400).send(error);
  }
};
