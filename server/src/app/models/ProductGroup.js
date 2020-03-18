import Sequelize, { Model } from 'sequelize';

class ProductGroup extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        star: Sequelize.BOOLEAN,
        discount: Sequelize.DECIMAL,
        active: Sequelize.BOOLEAN,
        expiration: Sequelize.DATE,
        quantityTotal: Sequelize.INTEGER,
        considerQuantity: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Store, { foreignKey: 'storeId' });
    this.hasMany(models.Product);
  }
}

export default ProductGroup;
