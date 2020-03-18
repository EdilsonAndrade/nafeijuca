import Sequelize, { Model } from 'sequelize';

class Store extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        addressLineTwo: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        number: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
        latitude: Sequelize.STRING,
        longitude: Sequelize.STRING,
        city: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatarId', as: 'storeavatar' });
  }
}

export default Store;
