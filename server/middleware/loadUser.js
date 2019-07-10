const User = require('../model/user').User;

exports.http = async (req, res, next) => {
  try {
    req.user = await User.findById(req.user._id);
    next();
  } catch (err) {
    next(err)
  }
};

exports.ws = async (socket, next) => {
  try {
    socket.user = await User.findById(socket.user._id);
    next();
  } catch (err) {
    next(err)
  }
};