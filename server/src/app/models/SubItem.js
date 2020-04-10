import Sequelize, { Model } from 'sequelize';

class SubItem extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        detail: Sequelize.STRING,
        mandatory: Sequelize.BOOLEAN,
        min: Sequelize.INTEGER,
        max: Sequelize.INTEGER,
        active: Sequelize.BOOLEAN,
        quantity: Sequelize.INTEGER,
        price: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default SubItem;
