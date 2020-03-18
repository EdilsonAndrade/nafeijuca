module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'is_Admin', {
      type: Sequelize.BOOLEAN,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'is_Admin');
  },
};
