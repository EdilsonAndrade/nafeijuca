import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../utils/truncate';

describe('ProductGroup', () => {
  it('Not authorized', async () => {
    const response = await request(app)
      .post('/stores/1/productgroups')
      .send({
        name: 'Feijoada Light',
        quantityTotal: 60,
        considerQuantity: true,
      });

    expect(response.body.error).toBe('User not authorized');
  });

  it('Create Group User not admin', async () => {
    const userProductGroup = await factory.create('User', {
      confirmed: true,
    });

    const response = await request(app)
      .post('/stores/1/productgroups')
      .set('Authorization', `Bearer ${userProductGroup.generateToken().token}`)
      .send({
        name: 'Feijoada Light',
        quantityTotal: 60,
        considerQuantity: true,
      });

    expect(response.body.error).toBe('User not allowed');
  });

  it('Validation Failed', async () => {
    await truncate();
    const userProductGroup = await factory.create('User', {
      isAdmin: true,
    });
    const fakeStoreProduct = await factory.create('Store', { active: true });
    const response = await request(app)
      .post(`/stores/${fakeStoreProduct.id}/productgroups`)
      .set('Authorization', `Bearer ${userProductGroup.generateToken().token}`)
      .send({
        quantityTotal: 60,
        considerQuantity: true,
      });
    expect(response.body.error).toBe('Validation failed');
  });

  it('Create Group Store inactive ', async () => {
    await truncate();
    const fakeStoreProduct = await factory.create('Store');

    const userProductGroup = await factory.create('User', {
      isAdmin: true,
    });
    const response = await request(app)
      .post(`/stores/${fakeStoreProduct.id}/productgroups`)
      .set('Authorization', `Bearer ${userProductGroup.generateToken().token}`)
      .send({
        name: 'Feijoada Light',
        quantityTotal: 60,
        considerQuantity: true,
      });
    expect(response.body.error).toBe('Store not found');
  });

  it('Create Group ', async () => {
    await truncate();
    const fakeStoreProduct = await factory.create('Store', { active: true });

    const userProductGroup = await factory.create('User', {
      isAdmin: true,
    });
    const response = await request(app)
      .post(`/stores/${fakeStoreProduct.id}/productgroups`)
      .set('Authorization', `Bearer ${userProductGroup.generateToken().token}`)
      .send({
        name: 'Feijoada Light',
        quantityTotal: 60,
        considerQuantity: true,
      });
    expect(response.body.id).toBeGreaterThan(0);
  });

  it('On Update Not authorized', async () => {
    const response = await request(app)
      .put(`/productgroups/1`)
      .send({
        name: 'Feijoada Light',
        quantityTotal: 60,
        considerQuantity: true,
      });

    expect(response.body.error).toBe('User not authorized');
  });
  it('On Update Validation failed', async () => {
    const userProductGroup = await factory.create('User', {
      isAdmin: true,
    });

    const updateResponse = await request(app)
      .put(`/productgroups/1`)
      .set('Authorization', `Bearer ${userProductGroup.generateToken().token}`)
      .send({
        oldName: 'Feijuca light',

        considerQuantity: true,
      });

    expect(updateResponse.body.error).toBe('Validation failed');
  });

  it('On Update Validation failed', async () => {
    const userProductGroup = await factory.create('User', {
      isAdmin: true,
    });

    const updateResponse = await request(app)
      .put(`/productgroups/1`)
      .set('Authorization', `Bearer ${userProductGroup.generateToken().token}`)
      .send({
        oldQuantityTotal: 60,
        considerQuantity: true,
      });

    expect(updateResponse.body.error).toBe('Validation failed');
  });

  it('On Update Product Group not found', async () => {
    const userProductGroup = await factory.create('User', {
      isAdmin: true,
    });

    const updateResponse = await request(app)
      .put(`/productgroups/456461`)
      .set('Authorization', `Bearer ${userProductGroup.generateToken().token}`)
      .send({
        name: 'Feijoada light',
        quantityTotal: 30,
        considerQuantity: true,
      });

    expect(updateResponse.body.error).toBe('Product Group not found');
  });

  it('On Update product success', async () => {
    const userProductGroup = await factory.create('User', {
      isAdmin: true,
    });

    const fakeStoreProduct = await factory.create('Store', {
      active: true,
    });
    const response = await request(app)
      .post(`/stores/${fakeStoreProduct.id}/productgroups`)
      .set('Authorization', `Bearer ${userProductGroup.generateToken().token}`)
      .send({
        name: 'Feijoada Light',
        quantityTotal: 60,
        considerQuantity: true,
      });
    expect(response.body.id).toBeGreaterThan(0);

    const updateResponse = await request(app)
      .put(`/productgroups/${response.body.id}`)
      .set('Authorization', `Bearer ${userProductGroup.generateToken().token}`)
      .send({
        oldName: 'Feijoada Gorda',
        name: 'Feijoada Ligh Top',
        quantityTotal: 60,
        considerQuantity: true,
      });

    expect(updateResponse.body.name).toBe('Feijoada Ligh Top');
  });

  it('On Delete Product Group not found', async () => {
    const userProductGroup = await factory.create('User', {
      isAdmin: true,
    });

    const response = await request(app)
      .delete(`/productgroups/456461`)
      .set('Authorization', `Bearer ${userProductGroup.generateToken().token}`);

    expect(response.body.error).toBe('Product Group not found');
  });

  it('On Delete product success', async () => {
    const userProductGroup = await factory.create('User', {
      isAdmin: true,
    });

    const fakeStoreProduct = await factory.create('Store', {
      active: true,
    });
    const response = await request(app)
      .post(`/stores/${fakeStoreProduct.id}/productgroups`)
      .set('Authorization', `Bearer ${userProductGroup.generateToken().token}`)
      .send({
        name: 'Feijoada Light',
        quantityTotal: 60,
        considerQuantity: true,
      });
    expect(response.body.id).toBeGreaterThan(0);

    const updateResponse = await request(app)
      .delete(`/productgroups/${response.body.id}`)
      .set('Authorization', `Bearer ${userProductGroup.generateToken().token}`);

    expect(updateResponse.body.message).toBe('Product Group Deleted');
  });

  it('Getting productGroup must take also products', async () => {
    const fakeStore = await factory.create('Store', {
      active: true,
    });

    const fakeProductGroup = await factory.create('ProductGroup', {
      name: 'Feijoiada Light',
      quantityAmount: 60,
      storeId: fakeStore.id,
    });

    const fakeProduct = await factory.create('Product', {
      productGroupId: fakeProductGroup.id,
      storeId: fakeStore.id,
    });

    const response = await request(app).get(
      `/stores/${fakeStore.id}/productgroups`
    );

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].Products.length).toBeGreaterThan(0);
    expect(response.body[0].Products[0].name).toBe(fakeProduct.name);
  });
});
