import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';
import Client from '../models/Client';
import Store from '../models/Store';
import Address from '../models/Address';

class ClientController {
  async store(req, res) {
    const { email, storeId, myAddress } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      storeId: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const client = await Client.findOne({ where: { email } });
    if (client) {
      return res.status(400).json({ error: 'Client already exists' });
    }
    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(400).json({ error: 'Store not found' });
    }

    const newClient = await Client.create(req.body);
    await Address.create({ ...myAddress, clientId: newClient.id });
    return res.json(newClient);
  }

  async update(req, res) {
    const { clientId } = req.params;
    const { myAddress } = req.body;
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(400).json({ error: 'Client not found' });
    }

    const updatedClient = await client.update(req.body);

    if (!myAddress.id) {
      await Address.create({ ...myAddress, clientId });
    } else {
      await Address.update(myAddress, { where: { id: myAddress.id } });
    }

    return res.json(updatedClient);
  }

  async index(req, res) {
    const { storeId, search } = req.params;

    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(400).json({ error: 'Store not found' });
    }
    if (search) {
      const clients = await Client.findAll({
        where: {
          storeId,
          [Op.or]: [
            {
              name: { [Op.like]: `%${search}%` },
            },
            {
              email: { [Op.like]: `%${search}%` },
            },
          ],
        },
        include: [
          {
            model: User,
            attribute: ['email', 'name', 'id'],
            required: false,
          },
          {
            model: Store,
          },
          {
            model: Address,
          },
        ],
        order: [['name', 'asc']],
      });

      return res.json(clients);
    }
    const clients = await Client.findAll({
      where: {
        storeId,
      },
      include: [
        {
          model: User,
          attribute: ['email', 'name', 'id'],
          required: false,
        },
        {
          model: Store,
        },
        {
          model: Address,
        },
      ],
      order: [['name', 'asc']],
    });

    console.log(clients);
    return res.json(clients);
  }

  async delete(req, res) {
    const { clientId } = req.params;

    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(400).json({ error: 'Client not found' });
    }

    await client.destroy();
    return res.json({ message: 'Client deleted' });
  }
}
export default new ClientController();
