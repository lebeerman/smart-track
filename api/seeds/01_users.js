exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user1', email: 'best@poop.com'},
        {username: 'user2', email: 'second@poop.com'},
        {username: 'user3', email: 'third@poop.com'}
      ]);
    });
};
