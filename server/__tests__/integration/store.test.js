import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../utils/truncate';

describe('Store', () => {
  beforeEach(async () => {
    await truncate();
  });
  it('Store address field are all required', async () => {
    const userStore = await factory.create('User', {
      isAdmin: true,
    });

    const response = await request(app)
      .post('/stores')
      .set('Authorization', `Bearer ${userStore.generateToken().token}`)
      .send({ name: 'Whatever' });

    expect(response.body.error).toBe('Store address fields are all required');
  });

  it('Store already exist', async () => {
    const userStore = await factory.create('User', {
      isAdmin: true,
    });

    const store = await factory.create('Store', {
      active: true,
    });
    const {
      name,
      zipcode,
      address,
      addresslinetwo,
      number,
      neighborhood,
      cnpj,
      active,
      city,
    } = store;
    const response = await request(app)
      .post('/stores')
      .set('Authorization', `Bearer ${userStore.generateToken().token}`)
      .send({
        name,
        zipcode,
        address,
        addresslinetwo,
        number,
        neighborhood,
        cnpj,
        active,
        city,
      });

    expect(response.body.error).toBe('Store already exists');
  });

  it('Store created', async () => {
    const userStore = await factory.create('User', {
      isAdmin: true,
    });

    const store = await factory.attrs('Store', {
      active: true,
    });
    const {
      name,
      zipcode,
      address,
      addresslinetwo,
      number,
      neighborhood,
      cnpj,
      active,
      city,
    } = store;

    const response = await request(app)
      .post('/stores')
      .set('Authorization', `Bearer ${userStore.generateToken().token}`)
      .send({
        name,
        zipcode,
        address,
        addresslinetwo,
        number,
        neighborhood,
        cnpj,
        active,
        city,
      });

    expect(response.body).toHaveProperty('id');
  });

  it('Update Store does not exist', async () => {
    const userStore = await factory.create('User', {
      isAdmin: true,
    });

    const store = await factory.attrs('Store', {
      active: true,
    });
    const {
      name,
      zipcode,
      address,
      addresslinetwo,
      number,
      neighborhood,
      cnpj,
      active,
      city,
    } = store;
    const response = await request(app)
      .put('/stores/1500')
      .set('Authorization', `Bearer ${userStore.generateToken().token}`)
      .send({
        name,
        zipcode,
        address,
        addresslinetwo,
        number,
        neighborhood,
        cnpj,
        active,
        city,
      });

    expect(response.body.error).toBe('Store doesnt exists');
  });

  it('Update Store', async () => {
    await truncate();
    const userStore = await factory.create('User', {
      isAdmin: true,
    });

    const store = await factory.create('Store', {
      active: true,
    });
    const {
      zipcode,
      address,
      addresslinetwo,
      number,
      neighborhood,
      cnpj,
      active,
      city,
    } = store;
    const response = await request(app)
      .put(`/stores/${store.id}`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`)
      .send({
        name: 'Eddy Store',
        zipcode,
        address,
        addresslinetwo,
        number,
        neighborhood,
        cnpj,
        active,
        city,
      });

    expect(response.body.name).toBe('Eddy Store');
  });

  it('Delete Store does not exist', async () => {
    await truncate();
    const userStore = await factory.create('User', {
      isAdmin: true,
    });

    const response = await request(app)
      .delete('/stores/1500')
      .set('Authorization', `Bearer ${userStore.generateToken().token}`);

    expect(response.body.error).toBe('Store doesnt exists');
  });

  it('Delete Store deactive', async () => {
    await truncate();
    const userStore = await factory.create('User', {
      isAdmin: true,
    });

    const store = await factory.create('Store', {
      active: true,
    });
    const response = await request(app)
      .delete(`/stores/${store.id}`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`);

    expect(response.body.active).toBe(false);
  });

  it('Get Store deactive', async () => {
    await truncate();
    const userStore = await factory.create('User', {
      isAdmin: true,
    });

    await factory.create('Store', {
      active: true,
    });
    const response = await request(app)
      .get(`/stores`)
      .set('Authorization', `Bearer ${userStore.generateToken().token}`);

    expect(response.body.length).toBeGreaterThan(0);
  });
});
