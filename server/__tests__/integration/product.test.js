import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../utils/truncate';

describe('PRODUCTS', () => {
  it('On Create Product not authorize', async () => {
    const response = await request(app)
      .post('/products')
      .send({ storeId: 1 });

    expect(response.body.error).toBe('User not authorized');
  });

  it('On Create Product is not admin', async () => {
    const productUser = await factory.create('User', {
      confirmed: true,
    });
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${productUser.generateToken().token}`)
      .send({ storeId: 1 });

    expect(response.body.error).toBe('User not allowed');
  });

  it('On Create Product validation failed', async () => {
    const productUser = await factory.create('User', {
      isAdmin: true,
    });
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${productUser.generateToken().token}`)
      .send({ storeId: 1 });

    expect(response.body.error).toBe('Validation failed');
  });

  it('On Create Product even for an deactive store', async () => {
    const productUser = await factory.create('User', {
      isAdmin: true,
    });
    const fakeStore = await factory.create('Store', {
      active: false,
    });
    const fakeProduct = await factory.attrs('Product');
    fakeProduct.storeId = fakeStore.id;
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${productUser.generateToken().token}`)
      .send(fakeProduct);

    expect(response.body.storeId).toBe(fakeStore.id);
  });

  it('On Create Product even for an deactive store, store not found', async () => {
    const productUser = await factory.create('User', {
      isAdmin: true,
    });
    await factory.create('Store', {
      active: false,
    });
    const fakeProduct = await factory.attrs('Product');
    fakeProduct.storeId = 46546;
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${productUser.generateToken().token}`)
      .send(fakeProduct);

    expect(response.body.error).toBe('Store not found');
  });

  it('On update not authorize', async () => {
    const response = await request(app).put('/products/1');

    expect(response.body.error).toBe('User not authorized');
  });

  it('On update not allowed', async () => {
    const productUser = await factory.create('User', {
      confirmed: true,
    });
    const response = await request(app)
      .put('/products/1')
      .set('Authorization', `Bearer ${productUser.generateToken().token}`);

    expect(response.body.error).toBe('User not allowed');
  });

  it('On update product not found', async () => {
    await truncate();
    const productUser = await factory.create('User', {
      isAdmin: true,
    });
    const response = await request(app)
      .put('/products/1')
      .set('Authorization', `Bearer ${productUser.generateToken().token}`);

    expect(response.body.error).toBe('Product not found');
  });

  it('On update product UPDATED', async () => {
    const product = await factory.create('Product');
    const productUser = await factory.create('User', {
      isAdmin: true,
    });
    const response = await request(app)
      .put(`/products/${product.id}`)
      .send({ name: 'Feijuca top' })
      .set('Authorization', `Bearer ${productUser.generateToken().token}`);

    expect(response.body.name).toBe('Feijuca top');
  });

  it('On delete product not found', async () => {
    await truncate();
    const productUser = await factory.create('User', {
      isAdmin: true,
    });
    const response = await request(app)
      .delete('/products/1')
      .set('Authorization', `Bearer ${productUser.generateToken().token}`);

    expect(response.body.error).toBe('Product not found');
  });

  it('On delete product SUCCESS', async () => {
    await truncate();
    const product = await factory.create('Product');
    const productUser = await factory.create('User', {
      isAdmin: true,
    });
    const response = await request(app)
      .delete(`/products/${product.id}`)
      .set('Authorization', `Bearer ${productUser.generateToken().token}`);

    expect(response.body.message).toBe('Product deleted');
  });

  it('on get product not found', async () => {
    await truncate();
    const productUser = await factory.create('User', {
      isAdmin: true,
    });
    const response = await request(app)
      .get(`/stores/1/products/${1231321}`)
      .set('Authorization', `Bearer ${productUser.generateToken().token}`);

    expect(response.body.error).toBe('Product not found');
  });

  it('on get store not found', async () => {
    await truncate();
    const productUser = await factory.create('User', {
      isAdmin: true,
    });
    const response = await request(app)
      .get(`/stores/1/products`)
      .set('Authorization', `Bearer ${productUser.generateToken().token}`);

    expect(response.body.error).toBe('Store not found');
  });

  it('on get product one product', async () => {
    await truncate();
    const store = await factory.create('Store');
    const product = await factory.create('Product', {
      storeId: store.id,
    });
    const productUser = await factory.create('User', {
      isAdmin: true,
    });
    const response = await request(app)
      .get(`/stores/${store.id}/products/${product.id}`)
      .set('Authorization', `Bearer ${productUser.generateToken().token}`);

    expect(response.body).toHaveProperty('Store');
    expect(response.body).toHaveProperty('ProductGroup');
  });

  it('on get all products', async () => {
    await truncate();
    const store = await factory.create('Store');
    await factory.create('Product', {
      storeId: store.id,
    });
    const productUser = await factory.create('User', {
      isAdmin: true,
    });
    const response = await request(app)
      .get(`/stores/${store.id}/products`)
      .set('Authorization', `Bearer ${productUser.generateToken().token}`);

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('ProductGroup');
    expect(response.body[0]).toHaveProperty('Store');
  });
});
