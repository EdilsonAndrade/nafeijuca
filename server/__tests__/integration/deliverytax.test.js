import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';

describe('DELIVERY TAX', () => {
  it('User not authorized for add delivery tax', async () => {
    const store = await factory.create('Store', {
      active: true,
    });

    const response = await request(app)
      .post(`/store/${store.id}/deliverytax`)
      .send({
        km: 3,
        tax: 0,
        freeTax: true,
      });

    expect(response.body.error).toEqual('User not authorized');
  });

  it('User create delivery tax for store', async () => {
    const store = await factory.create('Store', {
      active: true,
    });

    const userStore = await factory.create('User', {
      isAdmin: true,
      storeId: store.id,
    });

    const postResponse = await request(app)
      .post(`/stores/${store.id}/deliverytax`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`)
      .send({
        km: 3,
        tax: 0,
        freeTax: true,
      });
    expect(Number(postResponse.body.storeId)).toBeGreaterThan(0);
    const response = await request(app)
      .get(`/stores/${store.id}/deliverytax`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`);

    expect(response.body[0].km).toEqual(3);
    expect(response.body[0].tax).toEqual(0);
  });

  it('User create delivery tax for store and update it further', async () => {
    const store = await factory.create('Store', {
      active: true,
    });

    const userStore = await factory.create('User', {
      isAdmin: true,
      storeId: store.id,
    });

    const postResponse = await request(app)
      .post(`/stores/${store.id}/deliverytax`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`)
      .send({
        km: 3,
        tax: 0,
        freeTax: true,
      });
    expect(Number(postResponse.body.storeId)).toBeGreaterThan(0);

    const getResponse = await request(app)
      .get(`/stores/${store.id}/deliverytax`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`);

    const updateResponse = await request(app)
      .put(`/deliverytax/${getResponse.body[0].id}`)
      .send({
        km: 3,
        tax: 10,
        freeTax: true,
      })
      .set('Authorization', `Bearer ${userStore.generateToken().token}`);
    expect(Number(updateResponse.body.km)).toEqual(3);
    expect(Number(updateResponse.body.tax)).toEqual(10);
  });
});
