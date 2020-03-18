module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_groups', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      star: {
        type: Sequelize.BOOLEAN,
      },
      discount: {
        type: Sequelize.DECIMAL,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
      expiration: {
        type: Sequelize.DATE,
      },
      quantity_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      consider_quantity: {
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      store_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'stores',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('product_groups');
  },
};
