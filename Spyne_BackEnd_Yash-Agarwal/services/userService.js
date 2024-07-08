const User = require('../models/User');

exports.followUser = async (userId, followUserId) => {
  const user = await User.findById(userId);
  const followUser = await User.findById(followUserId);
  if (!user || !followUser) {
    throw new Error('User not found');
  }
  if (!user.following.includes(followUserId)) {
    user.following.push(followUserId);
    followUser.followers.push(userId);
    await user.save();
    await followUser.save();
  }
  return { user, followUser };
};
