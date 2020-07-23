import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../utils/truncate';

describe('CLIENTS', () => {
  it('On Save Not Authorized', async () => {
    const response = await request(app)
      .post('/stores/1/clients')
      .send({ name: 'Cliente 1' });
    expect(response.body.error).toBe('User not authorized');
  });
  // validation failed
  it('On Save success Validation failed', async () => {
    await truncate();
    const userClient = await factory.create('User', {
      confirmed: true,
    });
    const fakeStore = await factory.create('Store', {
      active: true,
    });
    const response = await request(app)
      .post(`/clients`)
      .set('Authorization', `Bearer ${userClient.generateToken().token}`)
      .send({
        name: 'Cliente 1',
        storeId: fakeStore.id,
      });
    expect(response.body.error).toBe('Validation failed');
  });
  // save successfully
  it('On Save success', async () => {
    const userClient = await factory.create('User', {
      confirmed: true,
    });
    const fakeStore = await factory.create('Store', {
      active: true,
    });

    const response = await request(app)
      .post(`/clients`)
      .set('Authorization', `Bearer ${userClient.generateToken().token}`)
      .send({
        name: 'Cliente 1',
        email: 'edi2@gmail.com',
        storeId: fakeStore.id,
      });

    expect(response.body.name).toBe('Cliente 1');
  });

  // client already exists
  it('On Save success Client already exists', async () => {
    const userClient = await factory.create('User', {
      confirmed: true,
    });
    const fakeStore = await factory.create('Store', {
      active: true,
    });
    await request(app)
      .post(`/clients`)
      .set('Authorization', `Bearer ${userClient.generateToken().token}`)
      .send({
        name: 'Cliente 1',
        email: 'edi@gmail.com',
        storeId: fakeStore.id,
      });

    const response = await request(app)
      .post(`/clients`)
      .set('Authorization', `Bearer ${userClient.generateToken().token}`)
      .send({
        name: 'Cliente 1',
        email: 'edi@gmail.com',
        storeId: fakeStore.id,
      });
    expect(response.body.error).toBe('Client already exists');
  });

  it('On Save success Store not found', async () => {
    await truncate();
    const userClient = await factory.create('User', {
      confirmed: true,
    });
    await factory.create('Store', {
      active: true,
    });
    const response = await request(app)
      .post(`/clients`)
      .set('Authorization', `Bearer ${userClient.generateToken().token}`)
      .send({
        name: 'Cliente 1',
        email: 'edi@gmail.com',
        storeId: 5646545,
      });
    expect(response.body.error).toBe('Store not found');
  });

  // update not authorized
  it('On Update not authorized', async () => {
    const fakeStore = await factory.create('Store', {
      active: true,
    });
    const response = await request(app)
      .put(`/clients/1`)
      .send({
        name: 'Cliente 1',
        email: 'edi@gmail.com',
        storeId: fakeStore.id,
      });
    expect(response.body.error).toBe('User not authorized');
  });
  it('On Update client not found', async () => {
    const userClient = await factory.create('User', {
      confirmed: true,
    });
    const fakeStore = await factory.create('Store', {
      active: true,
    });

    const response = await request(app)
      .put(`/clients/54651`)
      .set('Authorization', `bearer ${userClient.generateToken().token}`)
      .send({
        name: 'Cliente 1',
        email: 'edi@gmail.com',
        storeId: fakeStore.id,
      });
    expect(response.body.error).toBe('Client not found');
  });

  it('On Update client success', async () => {
    const userClient = await factory.create('User', {
      confirmed: true,
    });
    const fakeStore = await factory.create('Store', {
      active: true,
    });

    const fakeClient = await factory.create('Client', {
      storeId: fakeStore.id,
    });
    const response = await request(app)
      .put(`/clients/${fakeClient.id}`)
      .set('Authorization', `bearer ${userClient.generateToken().token}`)
      .send({
        name: 'Edilson',
        email: 'edi@gmail.com',
        storeId: fakeStore.id,
      });
    expect(response.body.name).toBe('Edilson');
  });

  it('On index store not found', async () => {
    const userClient = await factory.create('User', {
      confirmed: true,
    });

    const fakeStore = await factory.create('Store', {
      active: true,
    });

    const anotherFakeUser = await factory.create('User', {
      storeId: fakeStore.id,
    });

    await factory.create('Client', {
      name: 'Edilson',
      storeId: fakeStore.id,
      userId: anotherFakeUser.id,
    });

    const response = await request(app)
      .get(`/stores/${654654}/clients/${'e'}`)
      .set('Authorization', `bearer ${userClient.generateToken().token}`);

    expect(response.body.error).toBe('Store not found');
  });

  it('On index client with an app account is detected', async () => {
    const userClient = await factory.create('User', {
      confirmed: true,
    });

    const fakeStore = await factory.create('Store', {
      active: true,
    });

    const anotherFakeUser = await factory.create('User', {
      storeId: fakeStore.id,
    });

    await factory.create('Client', {
      name: 'Edilson',
      storeId: fakeStore.id,
      userId: anotherFakeUser.id,
    });

    const response = await request(app)
      .get(`/stores/${fakeStore.id}/clients/${'e'}`)
      .set('Authorization', `bearer ${userClient.generateToken().token}`);

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].User.name).toBe(anotherFakeUser.name);
  });

  it('On delete client not found', async () => {
    const userClient = await factory.create('User', {
      confirmed: true,
    });
    const response = await request(app)
      .delete('/clients/1')
      .set('Authorization', `bearer ${userClient.generateToken().token}`);

    expect(response.body.error).toBe('Client not found');
  });

  it('On delete client sucess', async () => {
    const userClient = await factory.create('User', {
      confirmed: true,
    });
    const fakeStore = await factory.create('Store', {
      active: true,
    });
    const fakerClient = await factory.create('Client', {
      storeId: fakeStore.id,
    });
    const response = await request(app)
      .delete(`/clients/${fakerClient.id}`)
      .set('Authorization', `bearer ${userClient.generateToken().token}`);

    expect(response.body.message).toBe('Client deleted');
  });
});
