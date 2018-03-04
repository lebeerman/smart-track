
exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.text('username');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.text('email');
    });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users');
};
