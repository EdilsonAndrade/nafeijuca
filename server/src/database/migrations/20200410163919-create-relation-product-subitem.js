module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'products_items',
      {
        min: {
          type: Sequelize.INTEGER,
        },
        max: {
          type: Sequelize.INTEGER,
        },
        mandatory: {
          type: Sequelize.BOOLEAN,
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        sub_item_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'sub_items',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        created_at: {
          type: Sequelize.DATE,
        },
        updated_at: {
          type: Sequelize.DATE,
        },
      },
      {
        indexes: [
          {
            name: 'uk_subitem',
            unique: true,
            fields: ['product_id', 'sub_item_id', 'mandatory'],
          },
        ],
      }
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable('products_items');
  },
};
