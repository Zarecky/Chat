
exports.up = function(knex) {
  return knex.schema.createTable('message', table => {
    table.increments('id').primary();
    table.string('message');
    table.string('type');
    table.timestamp('created');
    table.integer('user_id').references('user.id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('message');
};
