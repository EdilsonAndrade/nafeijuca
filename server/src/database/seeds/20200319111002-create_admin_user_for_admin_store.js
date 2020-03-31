const bcript = require('bcryptjs');

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Edilson',
        email: 'edilson.a.andrade@gmail.com',
        password: await bcript.hash('123456', 8),
        confirmed: true,
        is_admin: true,
        system_admin: true,
      },
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', {
      email: 'edilson.a.andrade@gmail.com',
    });
  },
};
