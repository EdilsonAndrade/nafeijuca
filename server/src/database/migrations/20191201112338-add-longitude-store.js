module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('stores', 'longitude', {
      type: Sequelize.STRING,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('stores', 'longitude');
  },
};
