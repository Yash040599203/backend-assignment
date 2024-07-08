const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.createUser = async (req, res) => {
  try {
    const { name, mobileNo, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, mobileNo, email, password: hashedPassword });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, config.jwt.secret, { expiresIn: '1h' });
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.searchUserByName = async (req, res) => {
  try {
    const users = await User.find({ name: new RegExp(req.query.name, 'i') });
    res.send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};
