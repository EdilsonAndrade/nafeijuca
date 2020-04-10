import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Store from '../src/app/models/Store';
import ProductGroup from '../src/app/models/ProductGroup';
import Product from '../src/app/models/Product';
import Client from '../src/app/models/Client';

factory.define('Client', Client, {
  name: faker.name.findName(),
  email: faker.internet.email(),
});

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  gender: 1,
  birthDate: faker.date.future(),
  password: '123456',
});

factory.define('Store', Store, {
  name: faker.name.findName(),
  address: faker.address.streetAddress(),
  zipcode: faker.address.zipCode(),
  neighborhood: faker.commerce.productName(),
  number: faker.random.number(),
  cnpj: '28153308000196',
  latitude: faker.random.number(),
  longitude: faker.random.number(),
  city: faker.address.city(),
});

factory.define('ProductGroup', ProductGroup, {
  name: faker.commerce.product(),
  quantityTotal: faker.random.number(),
});

factory.define('Product', Product, {
  name: faker.commerce.product(),
  equivalentAmount: faker.random.number(),
  quantity: faker.random.number(),
  price: faker.commerce.price(),
});

factory.define('SubItem', Product, {
  name: faker.commerce.product(),
  quantity: faker.random.number(),
  min: faker.random.number(),
  max: faker.random.number(),
  price: faker.commerce.price(),
});
export default factory;
