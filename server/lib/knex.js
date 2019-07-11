const knex = require('knex');
const connection = require('../knexfile');
const { Model } = require('objection');

const knexConnection = knex(connection);

Model.knex(knexConnection);

module.exports.Model = Model;