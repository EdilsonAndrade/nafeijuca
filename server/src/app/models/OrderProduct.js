import Sequelize, { Model } from 'sequelize';

class OrderProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        orderId: Sequelize.INTEGER,
        productId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'orderId',
    });
    this.belongsTo(models.Product, {
      foreignKey: 'productId',
    });
  }
}

export default OrderProduct;
