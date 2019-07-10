const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  hashedPass: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.methods.encryptPassword = function(pass) {
  return crypto
    .createHmac('sha1', this.salt)
    .update(pass)
    .digest('hex');
};

schema.virtual('pass')
  .set(function(pass) {
    this._plainPass = pass;
    this.salt = Math.random() + '';
    this.hashedPass = this.encryptPassword(pass);
  })
  .get(function() { return this._plainPass; });

schema.methods.checkPassword = function (pass) {
  return this.encryptPassword(pass) === this.hashedPass;
};

schema.statics.authorize = async function(name, pass) {
  const User = this;
  const existUser = await User.findOne({name});

  if (existUser && existUser.checkPassword(pass)) {
    return existUser;
  }
  throw new AuthError('Invalid password');
};

class AuthError extends Error {
  constructor(message) {
    super(arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
  }
}

exports.User = mongoose.model('User', schema);
exports.AuthError = AuthError;