import request from 'supertest';
import Cryptr from 'cryptr';
import factory from '../factories';
import app from '../../src/app';

describe('Confirmation  email', () => {
  const cryptr = new Cryptr(process.env.CRYPTKEY);
  it('User not found to try to update confirmation', async () => {
    const userId =
      'f1c4b7b3588561520208da2072ee269d76696b8b155647c90d7f898ff965c5f936b25ac4840540737b6fa057fac498d7f83b752b492e57abea04bf30271d94ba62ed57318d390d67e2cc981f8a8d7380f877f172e3883afda0a9af9904436db570';
    const response = await request(app).get(`/users/${userId}/confirmation`);

    expect(response.body.error).toBe('User not found');
  });

  it('Confirmation link confirmed', async () => {
    const userConfirmation = await factory.create('User', {
      updatedAt: new Date(2019, 10, 10),
    });
    const encryptId = cryptr.encrypt(userConfirmation.id);
    const response = await request(app).get(`/users/${encryptId}/confirmation`);

    expect(response.body.confirmed).toBeTruthy();
  });

  it('Confirmation when update Validation input failed', async () => {
    const response = await request(app).put(`/confirmation/`);

    expect(response.body.error).toBe('Validation input failed');
  });

  it('Confirmation when update User not found', async () => {
    const response = await request(app)
      .put(`/confirmation/`)
      .send({ email: 'naoexiste@gmail.com' });

    expect(response.body.error).toBe('User not found');
  });

  it('Confirmation update', async () => {
    const confirmationUser = await factory.create('User');
    const response = await request(app)
      .put(`/confirmation/`)
      .send({ email: confirmationUser.email });

    expect(response.body.confirmed).toBe(false);
  });
});
