import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../utils/truncate';

describe('Product Subitems', () => {
  it('create a product with 3 subitems and one comment', async () => {
    const userStore = await factory.create('User', {
      isAdmin: true,
    });
    const fakeProduct = await factory.create('Product', {
      name: 'Do Seu Jeito 1 pessoa',
    });
    const fakeProductItem = await factory.create('Product', {
      name: 'Couve',
    });
    const fakeProductItemTwo = await factory.create('Product', {
      name: 'Farofa',
    });
    const fakeProductItemThree = await factory.create('Product', {
      name: 'Torresmo',
    });

    await request(app)
      .post(`/products/${fakeProduct.id}/subitems`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`)
      .send({ subproductId: fakeProductItem.id });

    await request(app)
      .post(`/products/${fakeProduct.id}/subitems`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`)
      .send({ subproductId: fakeProductItemTwo.id });

    await request(app)
      .post(`/products/${fakeProduct.id}/subitems`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`)
      .send({ subproductId: fakeProductItemThree.id });

    const response = await request(app)
      .get(`/products/${fakeProduct.id}/subitems`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`);

    expect(response.body[0].ProductSubitem.name).toEqual('Couve');
    expect(response.body[1].ProductSubitem.name).toEqual('Farofa');
    expect(response.body[2].ProductSubitem.name).toEqual('Torresmo');
    expect(response.body.length).toBeGreaterThan(2);
  });
});
