import Sequelize, { Model } from 'sequelize';

class SubItem extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        detail: Sequelize.STRING,
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

  static associate(models) {
    this.belongsToMany(models.Product, {
      through: {
        model: models.ProductsItems,
      },
    });

    this.hasMany(models.ProductsItems, { as: 'subItemsProducts' });
  }
}

export default SubItem;
