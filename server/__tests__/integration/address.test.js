import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../utils/truncate';

describe('Address', () => {
  it('cannot save address if user is not logged', async () => {
    const response = await request(app)
      .post('/addresses')
      .send({
        address: 'Rua dos Buritis',
        number: '747',
      });

    expect(response.body.error).toBe('User not authorized');
  });

  it('dont save address  Address and number must be informed', async () => {
    const addressUser = await factory.create('User', {
      isAdmin: true,
    });

    const response = await request(app)
      .post('/addresses')
      .set('Authorization', `Bearer ${addressUser.generateToken().token}`)
      .send({
        name: 'My Address',
      });

    expect(response.body.error).toBe('Address and number must be informed');
  });

  it('dont save address  Address looks similar', async () => {
    await truncate();
    const addressUser = await factory.create('User', {
      id: 8888,
      isAdmin: true,
    });

    await request(app)
      .post('/addresses')
      .set('Authorization', `Bearer ${addressUser.generateToken().token}`)
      .send({
        name: 'My Address',
        address: 'Rua do Café',
        number: 77,
        userId: addressUser.id,
      });

    const response = await request(app)
      .post('/addresses')
      .set('Authorization', `Bearer ${addressUser.generateToken().token}`)
      .send({
        name: 'My Address',
        address: 'Rua do Café',
        number: 77,
        userId: addressUser.id,
      });

    expect(response.body.error).toBe('Address looks similar');
  });

  it('dont delete address  Address looks similar', async () => {
    const addressUser = await factory.create('User', {
      confirmed: true,
    });

    const responseDelete = await request(app)
      .delete(`/addresses/${1500}`)
      .set('Authorization', `Bearer ${addressUser.generateToken().token}`);

    expect(responseDelete.body.error).toBe('Address not found');
  });

  it('address deleted', async () => {
    const addressUser = await factory.create('User', {
      confirmed: true,
    });

    const fakeClient = await factory.create('Client', {});
    const responseAddress = await request(app)
      .post('/addresses')
      .set('Authorization', `Bearer ${addressUser.generateToken().token}`)
      .send({
        name: 'My Address',
        address: 'Rua do Café',
        number: 77,
        clientId: fakeClient.id,
      });
    const response = await request(app)
      .delete(`/addresses/${responseAddress.body.id}`)
      .set('Authorization', `Bearer ${addressUser.generateToken().token}`);

    expect(response.body.message).toBe('Address deleted');
  });

  it('get address for client ', async () => {
    const addressUser = await factory.create('User', {
      confirmed: true,
    });

    const client = await factory.create('Client');
    const savedResponst = await request(app)
      .post('/addresses')
      .set('Authorization', `Bearer ${addressUser.generateToken().token}`)
      .send({
        name: 'My Address',
        address: 'Rua do Café',
        number: 77,
        clientId: client.id,
      });

    expect(savedResponst.body.clientId).toBe(client.id);
    const response = await request(app)
      .get(`/addresses`)
      .send({ clientId: client.id })
      .set('Authorization', `Bearer ${addressUser.generateToken().token}`);
    expect(response.body[0].client.name).toBe(client.name);
  });

  it('get address for user app ', async () => {
    const addressUser = await factory.create('User', {
      confirmed: true,
    });

    await request(app)
      .post('/addresses')
      .set('Authorization', `Bearer ${addressUser.generateToken().token}`)
      .send({
        name: 'My Address',
        address: 'Rua do Café',
        number: 77,
        userId: addressUser.id,
      });
    const response = await request(app)
      .get(`/addresses`)
      .set('Authorization', `Bearer ${addressUser.generateToken().token}`);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it('save address to client and get it address', async () => {
    const addressUser = await factory.create('User', {
      confirmed: true,
    });

    const client = await factory.create('Client');
    await request(app)
      .post('/addresses')
      .set('Authorization', `Bearer ${addressUser.generateToken().token}`)
      .send({
        name: 'My Address',
        address: 'Rua do Café',
        number: 77,
        clientId: client.id,
      });
    const response = await request(app)
      .get(`/addresses`)
      .send({ clientId: client.id })
      .set('Authorization', `Bearer ${addressUser.generateToken().token}`);

    expect(response.body.length).toBeGreaterThan(0);
  });
});
