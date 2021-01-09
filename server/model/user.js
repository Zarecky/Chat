const crypto = require("crypto");
const { Model } = require("../lib/knex");
const { Message } = require("./message");

class User extends Model {
  constructor(obj) {
    super();

    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  get pass() {
    return this._plainPass;
  }

  set pass(pass) {
    this._plainPass = pass;
    this.salt = Math.random() + "";
    this.hashed_pass = this.encryptPassword(pass);
  }

  encryptPassword(pass) {
    return crypto.createHmac("sha1", this.salt).update(pass).digest("hex");
  }

  checkPassword(pass) {
    return this.encryptPassword(pass) === this.hashed_pass;
  }

  async save() {
    return await User.query().insert({
      ...this,
      _plainPass: undefined,
    });
  }

  static async authorize(name, pass) {
    const User = this;
    const existUser = await User.query().findOne({ name });

    if (existUser && existUser.checkPassword(pass)) {
      return existUser;
    }
    throw new AuthError("Invalid password");
  }

  static get tableName() {
    return "user";
  }

  static get relationMappings() {
    return {
      messages: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: "user.id",
          to: "message.user_id",
        },
      },
    };
  }
}

class AuthError extends Error {
  constructor(message) {
    super(arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
  }
}

exports.User = User;
exports.AuthError = AuthError;
