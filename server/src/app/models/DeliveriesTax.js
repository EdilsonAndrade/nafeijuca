import Sequelize, { Model } from 'sequelize';

class DeliverieTax extends Model {
  static init(sequelize) {
    super.init(
      {
        km: Sequelize.INTEGER,
        tax: Sequelize.DECIMAL,
        freeTax: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Store, { foreignKey: 'storeId' });
  }
}

export default DeliverieTax;
