module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cost_tax: {
        type: Sequelize.DECIMAL,
      },
      sub_total: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      total: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      discount: {
        type: Sequelize.DECIMAL,
      },
      prepare_start: {
        type: Sequelize.DATE,
      },
      delivery_start: {
        type: Sequelize.DATE,
      },
      delivery_end: {
        type: Sequelize.DATE,
      },
      feedback: {
        type: Sequelize.STRING,
      },
      stars: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clients',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
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
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      canceled_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('orders');
  },
};
