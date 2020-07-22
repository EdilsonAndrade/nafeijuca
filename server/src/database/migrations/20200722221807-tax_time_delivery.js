module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deliverie_taxes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stores',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      km: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tax: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      free_tax: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('deliverie_taxes');
  },
};
