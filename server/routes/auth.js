const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../model/user').User;
const AuthError = require('../model/user').AuthError;
const { registerValidation, loginValidation } = require('../lib/validation');

router.post('/register', async (req, res, next) => {
  const {error} = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const {name, pass} = req.body;
  
  try {
    const existUser = await User.findOne({name});

    if (existUser) {
      return res.status(400).send('Such user already exists')
    }

    const user = new User({name, pass});
    const savedUser = await user.save();
    const token = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET);

    res.header('auth-token', token).send();
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const {error} = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const {name, pass} = req.body;

  try {
    const user = await User.authorize(name, pass);

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send();
  } catch (err) {
    if (err instanceof AuthError) {
      return res.status(403).send('Username or password is wrong')
    }
    return next(err);
  }
});

module.exports = router;