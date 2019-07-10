const jwt = require('jsonwebtoken');

exports.http = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

exports.ws = async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    socket.user = verified;
    next();
  } catch (err) {
    return next(err);
  }
};