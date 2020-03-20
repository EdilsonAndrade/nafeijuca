module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('stores', [
      {
        name: 'Admin Store',
        address: 'Admin',
        number: '00000',
        active: true,
        zipcode: '00000-000',
        cnpj: '0000000000',
      },
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('stores', { name: 'Admin Store' });
  },
};
