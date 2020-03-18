import Sequelize, { Model } from 'sequelize';

class SubItem extends Model {
  static init(sequelize) {
    super.init(
      {
        comments: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'productId', as: 'Product' });
    this.belongsTo(models.Product, {
      foreignKey: 'subproductId',
      as: 'ProductSubitem',
    });
  }
}

export default SubItem;
