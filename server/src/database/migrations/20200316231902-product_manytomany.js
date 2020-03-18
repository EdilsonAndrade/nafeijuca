module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sub_items', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      },
      subproduct_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      },
      comments: {
        type: Sequelize.STRING,
      },
      min: {
        type: Sequelize.INTEGER,
      },
      max: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('sub_items');
  },
};
