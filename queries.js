const database = require('./database-connection');

module.exports = {
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
  }
};
