module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'store_Id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'stores',
        key: 'id',
      },
      allowNull: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'store_Id');
  },
};
