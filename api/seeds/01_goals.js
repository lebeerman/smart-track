
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('goals').del()
    .then(() => {
      // Inserts seed entries
      return knex('goals').insert([
        {dueDate: '1988-12-09', goal:'get through the WDI',complete: false },
        {dueDate: '1988-12-09', goal:'be like Neo from the Matrix',complete: false },
        {dueDate: '1988-12-09', goal:'always be selling',complete: false }
      ]);
    });
};
