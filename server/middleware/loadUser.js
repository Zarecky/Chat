const { User } = require('../model/user');

exports.http = async (req, res, next) => {
  try {
    req.user = await User.query().findById(req.user.id);
    next();
  } catch (err) {
    next(err)
  }
};

exports.ws = async (socket, next) => {
  try {
    socket.user = await User.query().findById(socket.user.id);
    next();
  } catch (err) {
    next(err)
  }
};