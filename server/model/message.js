const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  message: {
    type: String,
  },
  type: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
});

module.exports = mongoose.model('Message', schema);