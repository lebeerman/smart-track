const database = require('./database-connection');

module.exports = {
  // goal management
  list() {
    return database('smartgoals').select();
  },
  read(id) {
    return database('smartgoals')
      .where('id', id)
      .select()
      .first();
  },
  create(goal) {
    return database('smartgoals')
      .insert(goal)
      .returning('*')
      .then(record => record[0]);
  },
  update(id, goal) {
    return database('smartgoals')
      .update(goal)
      .where('id', id)
      .returning('*')
      .then(record => record[0]);
  },
  delete(id) {
    return database('smartgoals')
      .where('id', id)
      .del();
  },
  // users management
  list() {
    return database('users').select();
  },
  read(id) {
    return database('users')
      .where('id', id)
      .select()
      .first();
  },
  create(goal) {
    return database('users')
      .insert(goal)
      .returning('*')
      .then(record => record[0]);
  },
  update(id, username) {
    return database('users')
      .update(username)
      .where('id', id)
      .returning('*')
      .then(record => record[0]);
  },
  delete(id) {
    return database('users')
      .where('id', id)
      .del();
  }
};
