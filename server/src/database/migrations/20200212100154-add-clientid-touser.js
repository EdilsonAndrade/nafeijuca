module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'client_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'clients',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'client_id');
  },
};
