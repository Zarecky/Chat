const { Model } = require('../lib/knex');
const us = require('./user');
const knex = require('knex');

class Message extends Model {
  constructor(obj) {
    super();

    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  async save() {
     const user = await us.User.query().findById(this.user_id);
     const message = await user.$relatedQuery('message').insert({
       ...this,
       user_id: undefined
     });
     return {
       ...message,
       user: user.name
     }
  }

  static async getAllByOrder() {
    return await Message.query()
      .select('message', 'user.name as user', 'message.created', 'type')
      .joinRelation('user').orderBy('created');
  }

  static get tableName() {
    return 'message';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: us.User,
        join: {
          from: 'message.user_id',
          to: 'user.id'
        }
      }
    }
  }
}

exports.Message = Message;
