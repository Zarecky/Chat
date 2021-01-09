exports.up = function (knex) {
  return knex.schema.createTable("room", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.timestamp("created_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("room");
};
