module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('stores', 'city', {
      type: Sequelize.STRING,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('stores', 'city');
  },
};
