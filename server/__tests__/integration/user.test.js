import request from 'supertest';
import { isBefore, parseISO } from 'date-fns';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../utils/truncate';

describe('User', () => {
  it('should create a user for a active store and sen email with link confirmation', async () => {
    const fakeUser = await factory.attrs('User');
    const fakerStore = await factory.create('Store', {
      active: true,
    });
    const response = await request(app)
      .post('/users')
      .send({ ...fakeUser, storeId: fakerStore.id });

    const result = isBefore(parseISO(response.body.expiration), new Date());
    expect(result).toBe(true);
  });

  it('should create the same user for another active store and sen email with link confirmation', async () => {
    const fakeUser = await factory.attrs('User');
    const fakerStore = await factory.create('Store', {
      active: true,
    });
    const response = await request(app)
      .post('/users')
      .send({ ...fakeUser, storeId: fakerStore.id });

    const result = isBefore(parseISO(response.body.expiration), new Date());
    expect(result).toBe(true);

    const anotherFakeStore = await factory.create('Store', {
      active: true,
    });

    const anotherResponse = await request(app)
      .post('/users')
      .send({ ...fakeUser, storeId: anotherFakeStore.id });

    const anotherResult = isBefore(
      parseISO(anotherResponse.body.expiration),
      new Date()
    );
    expect(anotherResult).toBe(true);
  });

  it('should User Already Exist for the same store', async () => {
    const fakerStore = await factory.create('Store', {
      active: true,
    });
    const fakeUser = await factory.create('User', {
      storeId: fakerStore.id,
    });
    const { name, email, birthDate, gender, password, isAdmin } = fakeUser;

    await request(app)
      .post('/users')
      .send({
        name,
        email,
        birthDate,
        gender,
        password,
        isAdmin,
        storeId: fakeUser.storeId,
      })
      .expect(400, { error: 'User already exists' });
  });

  it('user already exists for a active store', async () => {
    await truncate();
    const fakerStore = await factory.create('Store');
    const fakeUser = await factory.create('User', {
      storeId: fakerStore.id,
    });
    const { name, email, birthDate, gender, password, isAdmin } = fakeUser;

    const response = await request(app)
      .post('/users')
      .send({
        name,
        email,
        birthDate,
        gender,
        password,
        isAdmin,
        storeId: fakeUser.storeId,
      });
    expect(response.body.error).toBe('User already exists');
  });

  it('should not create a user for an non active store', async () => {
    await truncate();
    const fakeUser = await factory.attrs('User');
    const fakerStore = await factory.create('Store');
    const response = await request(app)
      .post('/users')
      .send({ ...fakeUser, storeId: fakerStore.id });
    expect(response.body.error).toBe('Store not found');
  });

  it('validation input failed when creating using without password', async () => {
    const response = await request(app).post('/users');

    expect(response.body.error).toBe('Validation input failed');
  });

  it('should create an admin user for a active store and sen email with link confirmation', async () => {
    const fakeUser = await factory.attrs('User');
    const fakerStore = await factory.create('Store', {
      active: true,
    });
    const response = await request(app)
      .post('/users')
      .send({ ...fakeUser, storeId: fakerStore.id, isAdmin: true });

    expect(response.body.isAdmin).toBe(true);
  });

  it('error when list all users and store associated without token', async () => {
    const response = await request(app).get('/users');

    expect(response.body.error).toBe('User not authorized');
  });

  it('error when list all users and store associated wrong token', async () => {
    const response = await request(app)
      .get('/users')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTgwOTg3MTQwLCJleHAiOjE1ODE1OTE5NDB9.LGJ_ejMaznMypiDGdqp_3HDKZKf9Vtbodj4k9vNLCfo'
      );

    expect(response.body.error).toBe(
      'Error has occur JsonWebTokenError: invalid signature'
    );
  });

  it('list all users and store associated with valid token', async () => {
    await truncate();
    const anotherUser = await factory.create('User', {
      isAdmin: true,
      confirmed: true,
    });
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${anotherUser.generateToken().token}`);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it('update user ', async () => {
    await truncate();
    const fakerStore = await factory.create('Store', {
      active: true,
    });

    const anotherUser = await factory.create('User', {
      confirmed: true,
      storeId: fakerStore.id,
    });

    const response = await request(app)
      .put(`/users/${anotherUser.id}`)
      .send({
        oldPassword: '123456',
        oldEmail: anotherUser.email,
        email: 'novo@gmail.com',
        password: '1234567',
      })
      .set('Authorization', `Bearer ${anotherUser.generateToken().token}`);

    expect(response.body.email).toBe('novo@gmail.com');
    expect(response.body.password).toBeUndefined();
  });

  it('update user validation input failed ', async () => {
    await truncate();
    const fakerStore = await factory.create('Store', {
      active: true,
    });

    const anotherUser = await factory.create('User', {
      confirmed: true,
      storeId: fakerStore.id,
    });

    const response = await request(app)
      .put(`/users/${anotherUser.id}`)
      .send({
        oldPassword: '123456',
        oldEmail: anotherUser.email,
        email: 'novo@gmail.com',
      })
      .set('Authorization', `Bearer ${anotherUser.generateToken().token}`);
    expect(response.body.error).toBe('Validation input failed');
  });

  it('update user Not Confirmed', async () => {
    await truncate();
    const fakerStore = await factory.create('Store', {
      active: true,
    });

    const anotherUser = await factory.create('User', {
      confirmed: false,
      storeId: fakerStore.id,
    });

    const response = await request(app)
      .put(`/users/${anotherUser.id}`)
      .send({
        oldPassword: '123456',
        oldEmail: anotherUser.email,
        email: 'novo@gmail.com',
      })
      .set('Authorization', `Bearer ${anotherUser.generateToken().token}`);
    expect(response.body.error).toBe('User not confirmed');
  });

  it('update user Password is invalid', async () => {
    await truncate();
    const fakerStore = await factory.create('Store', {
      active: true,
    });

    const anotherUser = await factory.create('User', {
      confirmed: true,
      storeId: fakerStore.id,
    });

    const response = await request(app)
      .put(`/users/${anotherUser.id}`)
      .send({
        oldPassword: '1234567',
        oldEmail: anotherUser.email,
        email: 'novo@gmail.com',
        password: '1234567',
      })
      .set('Authorization', `Bearer ${anotherUser.generateToken().token}`);
    expect(response.body.error).toBe('Password Invalid');
  });

  it('To change e-mail, old email must be informed', async () => {
    await truncate();
    const fakerStore = await factory.create('Store', {
      active: true,
    });

    const anotherUser = await factory.create('User', {
      confirmed: true,
      storeId: fakerStore.id,
    });

    const response = await request(app)
      .put(`/users/${anotherUser.id}`)
      .send({
        oldPassword: '123456',
        password: '1234567',
        email: anotherUser.email,
      })
      .set('Authorization', `Bearer ${anotherUser.generateToken().token}`);
    expect(response.body.error).toBe(
      'To change e-mail, old e-mail must be informed'
    );
  });

  it('To change e-mail, old email must be informed', async () => {
    await truncate();
    const fakerStore = await factory.create('Store', {
      active: true,
    });

    const anotherUser = await factory.create('User', {
      confirmed: true,
      storeId: fakerStore.id,
    });

    const response = await request(app)
      .put(`/users/${anotherUser.id}`)
      .send({
        oldPassword: '123456',
        password: '1234567',
        isAdmin: true,
      })
      .set('Authorization', `Bearer ${anotherUser.generateToken().token}`);
    expect(response.body.confirmed).toBe(true);
  });

  it('delete is not admin User logged is not admin', async () => {
    await truncate();
    const fakerStore = await factory.create('Store', {
      active: true,
    });

    const anotherUser = await factory.create('User', {
      confirmed: true,
      storeId: fakerStore.id,
      isAdmin: false,
    });

    const response = await request(app)
      .delete(`/users/${anotherUser.id}`)
      .set('Authorization', `Bearer ${anotherUser.generateToken().token}`);

    expect(response.body.error).toBe('User logged is not admin');
  });

  it('on delete user not found', async () => {
    await truncate();
    const fakerStore = await factory.create('Store', {
      active: true,
    });

    const anotherUser = await factory.create('User', {
      confirmed: true,
      storeId: fakerStore.id,
      isAdmin: true,
    });

    const response = await request(app)
      .delete(`/users/${154654}`)
      .set('Authorization', `Bearer ${anotherUser.generateToken().token}`);

    expect(response.body.error).toBe('User not found');
  });

  it('on delete success', async () => {
    await truncate();
    const fakerStore = await factory.create('Store', {
      active: true,
    });

    const anotherUser = await factory.create('User', {
      confirmed: true,
      storeId: fakerStore.id,
      isAdmin: true,
    });

    const response = await request(app)
      .delete(`/users/${anotherUser.id}`)
      .set('Authorization', `Bearer ${anotherUser.generateToken().token}`);

    expect(response.body.message).toBe(
      `User ${anotherUser.email} deleted successfully`
    );
  });
});
