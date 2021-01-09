exports.up = function (knex) {
  return knex.schema.createTable("message", (table) => {
    table.increments("id").primary();
    table.string("message");
    table.string("type");
    table.timestamp("created_at");
    table.integer("user_id").references("user.id");
    table.integer("room_id").references("room.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("message");
};
