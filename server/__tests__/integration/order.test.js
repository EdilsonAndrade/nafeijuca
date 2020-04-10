import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../utils/truncate';

describe('ORDERS', () => {
  it('Create an order with 3 products for a user from phone call / whatsapp', async () => {
    await truncate();
    const userMaster = await factory.create('User', {
      active: true,
      confirmed: true,
    });
    const fakeStore = await factory.create('Store', {
      active: true,
    });
    const user = await factory.create('Client', {
      active: true,
      storeId: fakeStore.id,
      confirmed: true,
    });
    const productGroup = await factory.create('ProductGroup', {
      storeId: fakeStore.id,
    });
    const product1 = await factory.create('Product', {
      storeId: fakeStore.id,
      productGroupId: productGroup.id,
    });
    const product2 = await factory.create('Product', {
      storeId: fakeStore.id,
      productGroupId: productGroup.id,
    });
    const product3 = await factory.create('Product', {
      storeId: fakeStore.id,
      productGroupId: productGroup.id,
    });

    // create an order with array of products
    const orderResponse = await request(app)
      .post(`/orders`)
      .send({
        products: [product1, product2, product3],
        productIds: [product1.id, product2.id, product3.id],
        clientId: user.id,
        storeId: fakeStore.id,
        costTax: 10,
      })
      .set('Authorization', `Bearer ${userMaster.generateToken().token}`);

    const clientOrders = await request(app)
      .get(`/clients/${user.id}/orders`)
      .set('Authorization', `Bearer ${userMaster.generateToken().token}`);

    expect(clientOrders.body.length).toBeGreaterThan(0);
    expect(orderResponse.body).toHaveProperty('id');
  });

  it('on enter in client account show his  orders with its products', async () => {
    await truncate();
    const userMaster = await factory.create('User', {
      active: true,
      confirmed: true,
    });
    const fakeStore = await factory.create('Store', {
      active: true,
    });
    const user = await factory.create('Client', {
      active: true,
      storeId: fakeStore.id,
      confirmed: true,
    });
    const productGroup = await factory.create('ProductGroup', {
      storeId: fakeStore.id,
    });
    const product1 = await factory.create('Product', {
      storeId: fakeStore.id,
      productGroupId: productGroup.id,
    });
    const product2 = await factory.create('Product', {
      storeId: fakeStore.id,
      productGroupId: productGroup.id,
    });
    const product3 = await factory.create('Product', {
      storeId: fakeStore.id,
      productGroupId: productGroup.id,
    });

    // create an order with array of products
    const orderResponse = await request(app)
      .post(`/orders`)
      .send({
        products: [product1, product2, product3],
        productIds: [product1.id, product2.id, product3.id],
        clientId: user.id,
        storeId: fakeStore.id,
        costTax: 10,
      })
      .set('Authorization', `Bearer ${userMaster.generateToken().token}`);

    const clientOrders = await request(app)
      .get(`/clients/${user.id}/orders`)
      .set('Authorization', `Bearer ${userMaster.generateToken().token}`);

    expect(clientOrders.body.length).toBeGreaterThan(0);
    expect(clientOrders.body[0].OrderProducts.length).toBeGreaterThan(0);
    expect(orderResponse.body).toHaveProperty('id');
  });
});
