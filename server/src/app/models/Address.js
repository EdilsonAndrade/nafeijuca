import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        addressLineTwo: Sequelize.STRING,
        number: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        latitude: Sequelize.STRING,
        longitude: Sequelize.STRING,
        km: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
  }
}

export default Address;
