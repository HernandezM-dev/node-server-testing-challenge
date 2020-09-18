
exports.seed = function(knex) {
      return knex('members').insert([
        {id: 1, username: 'Gobuta', game: 'league of legends'},
      ]);
};
