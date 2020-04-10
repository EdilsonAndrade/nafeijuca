import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Address from '../app/models/Address';
import Store from '../app/models/Store';
import Product from '../app/models/Product';
import ProductGroup from '../app/models/ProductGroup';
import File from '../app/models/File';
import Client from '../app/models/Client';
import Order from '../app/models/Order';
import OrderProduct from '../app/models/OrderProduct';
import SubItem from '../app/models/SubItem';
import ProductsItems from '../app/models/ProductsItems';

const models = [
  User,
  Address,
  Store,
  ProductGroup,
  Product,
  File,
  Client,
  Order,
  OrderProduct,
  SubItem,
  ProductsItems,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(
        model =>
          model && model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
