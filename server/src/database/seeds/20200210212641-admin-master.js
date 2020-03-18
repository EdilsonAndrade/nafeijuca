module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('stores', {
      name: 'Admin Store',
      address: 'Admin',
      number: '0',
      active: true,
    });
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('stores', { name: 'Admin Store' });
  },
};
