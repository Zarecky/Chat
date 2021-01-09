const { Model } = require("../lib/knex");
const message = require("./message");
const knex = require("knex");

class Room extends Model {
  constructor(obj) {
    super();

    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  async save() {
    return await Room.query().insert({
      ...this,
    });
  }

  static async getAllByOrder() {
    return await Room.query().select("id", "title").orderBy("created_at");
  }

  static async create(title) {
    const room = new Room({
      created_at: Date.now(),
      title,
    });
    await room.save();
    return room;
  }

  static get tableName() {
    return "room";
  }

  async getMessages() {
    return await message.Message.query()
      .select("message", "user.name as user", "message.created_at", "type")
      .joinRelation("user")
      .where("room_id", this.id)
      .orderBy("message.created_at");
  }

  static get relationMappings() {
    return {
      messages: {
        relation: Model.HasManyRelation,
        modelClass: message.Message,
        join: {
          from: "room.id",
          to: "message.room_id",
        },
      },
    };
  }
}

exports.Room = Room;
