import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        feedback: Sequelize.STRING,
        costTax: Sequelize.DECIMAL,
        subTotal: Sequelize.DECIMAL,
        total: Sequelize.DECIMAL,
        discount: Sequelize.DECIMAL,
        prepareStart: Sequelize.DATE,
        deliveryStart: Sequelize.DATE,
        deliveryEnd: Sequelize.DATE,
        canceledAt: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Store, { foreignKey: 'storeId' });
    this.belongsTo(models.Client, { foreignKey: 'clientId' });
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.belongsToMany(models.Product, {
      through: {
        model: 'order_products',
        foreignKey: 'orderId',
      },
    });
    this.hasMany(models.OrderProduct, { as: 'OrderProducts' });
  }
}

export default Order;
