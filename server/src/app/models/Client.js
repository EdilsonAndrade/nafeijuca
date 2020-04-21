import Sequelize, { Model } from 'sequelize';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Store, { foreignKey: 'storeId' });
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.hasMany(models.Address, { foreignKey: 'clientId' });
  }
}

export default Client;
