
exports.up = function(knex) {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('hashed_pass');
    table.string('salt');
    table.timestamp('created');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
