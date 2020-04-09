import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        equivalentAmount: Sequelize.INTEGER,
        price: Sequelize.DECIMAL,
        promotionPrice: Sequelize.DECIMAL,
        promotionExpire: Sequelize.DATE,
        active: Sequelize.BOOLEAN,
        monday: Sequelize.BOOLEAN,
        tuesday: Sequelize.BOOLEAN,
        wednesday: Sequelize.BOOLEAN,
        thursday: Sequelize.BOOLEAN,
        friday: Sequelize.BOOLEAN,
        saturday: Sequelize.BOOLEAN,
        sunday: Sequelize.BOOLEAN,
        quantity: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.ProductGroup, {
      foreignKey: 'productGroupId',
    });
    this.belongsTo(models.File, { foreignKey: 'imageId' });
    this.belongsTo(models.Store, { foreignKey: 'storeId' });
    this.belongsToMany(models.Order, {
      through: {
        model: 'order_products',
        foreignKey: 'productId',
      },
    });
  }
}

export default Product;
