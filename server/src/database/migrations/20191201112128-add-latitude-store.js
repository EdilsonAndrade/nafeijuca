module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('stores', 'latitude', {
      type: Sequelize.STRING,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('stores', 'latitude');
  },
};
