const bcript = require('bcryptjs');

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Edilson',
        email: 'edilson.a.andrade@gmail.com',
        password: await bcript.hash('nafeijucaAdmin', 8),
        confirmed: true,
        store_Id: 1,
        is_admin: true,
      },
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', {
      email: 'edilson.a.andrade@gmail.com',
    });
  },
};
