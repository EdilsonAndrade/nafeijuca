import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../utils/truncate';

describe('Product Subitems', () => {
  it('create a product with 3 subitems and one comment', async () => {
    const fakeStore = await factory.create('Store', {
      active: false,
    });
    const userStore = await factory.create('User', {
      isAdmin: true,
      storeId: fakeStore.id,
    });

    const productGroup = await factory.create('ProductGroup', {
      storeId: fakeStore.id,
    });

    const fakeProduct = await factory.create('Product', {
      storeId: fakeStore.id,
      productGroupId: productGroup.id,
    });

    const fakeProductItem = await factory.attrs('SubItem', {
      name: 'Couve',
      price: 9,
      detail: 'Serve 1 Pessoa',
      mandatory: true,
      ProductsItems: {
        min: 0,
        max: 1,
      },
    });
    const fakeProductItemTwo = await factory.attrs('SubItem', {
      name: 'Farofa',
      price: 11,
      detail: 'Serve 1 Pessoa',
      ProductsItems: {
        min: 0,
        max: 1,
      },
    });
    const fakeProductItemThree = await factory.attrs('SubItem', {
      name: 'Torresmo',
      price: 10,
      detail: 'Serve 2 Pessoas',
      ProductsItems: {
        min: 0,
        max: 1,
      },
    });

    await request(app)
      .post(`/products/${fakeProduct.id}/subitems`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`)
      .send({ SubItem: fakeProductItem });

    await request(app)
      .post(`/products/${fakeProduct.id}/subitems`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`)
      .send({ SubItem: fakeProductItemTwo });

    await request(app)
      .post(`/products/${fakeProduct.id}/subitems`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`)
      .send({ SubItem: fakeProductItemThree });

    const response = await request(app)
      .get(`/stores/${fakeStore.id}/products`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`);
    console.log(`envio = ${JSON.stringify(response.body[0])}`);
    expect(response.body[0].SubItems[2].ProductsItems.mandatory).toEqual(true);
    expect(response.body[0].SubItems[2].name).toEqual('Couve');
    expect(response.body[0].SubItems[0].name).toEqual('Farofa');
    expect(response.body[0].SubItems[1].name).toEqual('Torresmo');
    expect(response.body[0].SubItems.length).toBeGreaterThan(0);
  });
});
