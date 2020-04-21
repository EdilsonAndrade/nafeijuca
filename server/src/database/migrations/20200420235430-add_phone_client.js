module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('clients', 'phone', {
      type: Sequelize.STRING,
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn('clients', 'phone');
  },
};
