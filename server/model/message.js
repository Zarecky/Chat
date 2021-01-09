const { Model } = require("../lib/knex");
const u = require("./user");
const { Room } = require("./room");
const knex = require("knex");

class Message extends Model {
  constructor(obj) {
    super();

    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  async save() {
    await Message.query().insert({
      ...this,
    });
  }

  static async create(user, room, type, message = undefined) {
    const instance = new Message({
      created_at: Date.now(),
      user_id: user.id,
      room_id: room.id,
      type,
      message,
    });
    await instance.save();
    return {
      ...instance,
      user_id: undefined,
      room_id: undefined,
      user: user.name,
    };
  }

  static get tableName() {
    return "message";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: u.User,
        join: {
          from: "message.user_id",
          to: "user.id",
        },
      },
      room: {
        relation: Model.BelongsToOneRelation,
        modelClass: Room,
        join: {
          from: "message.room_id",
          to: "room.id",
        },
      },
    };
  }
}

exports.Message = Message;
