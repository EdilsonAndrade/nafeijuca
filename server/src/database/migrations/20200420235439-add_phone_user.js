module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'phone', {
      type: Sequelize.STRING,
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn('users', 'phone');
  },
};
