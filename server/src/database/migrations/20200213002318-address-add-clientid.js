module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('addresses', 'client_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn('addresses', 'client_id');
  },
};
