import Sequelize, { Model } from 'sequelize';

class ProductsItems extends Model {
  static init(sequelize) {
    super.init(
      {
        min: Sequelize.INTEGER,
        max: Sequelize.INTEGER,
        mandatory: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default ProductsItems;
