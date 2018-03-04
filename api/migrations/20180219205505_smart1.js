exports.up = (knex, Promise) => {
  return knex.schema.createTable('goals', table => {
    table.increments('id').primary();
    table.date('dueDate');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.text('goal');
    table.boolean('complete');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('goals');
};
