import request from 'supertest';
import Cryptr from 'cryptr';
import factory from '../factories';
import app from '../../src/app';

describe('Confirmation  email', () => {
  const cryptr = new Cryptr(process.env.CRYPTKEY);
  it('User not found to try to update confirmation', async () => {
    const fakerStore = await factory.create('Store', {
      active: true,
    });

    await factory.create('User', {
      confirmed: true,
      storeId: fakerStore.id,
    });
    const userId = cryptr.encrypt(56456564);

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
