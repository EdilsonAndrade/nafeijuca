import * as Yup from 'yup';
import { Op } from 'sequelize';
import Address from '../models/Address';
import User from '../models/User';
import Client from '../models/Client';

class AddressController {
  async store(req, res) {
    const { userId, clientId } = req.body;

    const {
      name,
      address,
      addressLineTwo,
      zipcode,
      number,
      neighborhood,
      city,
    } = req.body;
    const schema = Yup.object().shape({
      address: Yup.string()
        .required()
        .min(5),
      number: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(401)
        .json({ error: 'Address and number must be informed' });
    }
    if (!clientId && !userId) {
      return res.status(401).json('Client or User Id must be informed');
    }

    if (clientId) {
      const client = await Client.findByPk(clientId);
      if (!client) {
        return res.status(401).json({ error: 'Client not found' });
      }
    }

    if (!clientId && userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
    }

    let userAddress = await Address.findOne({
      where: {
        address,
        number,
        [Op.or]: [
          {
            clientId: {
              [Op.eq]: clientId,
            },
          },
          {
            userId: { [Op.eq]: userId },
          },
        ],
      },
    });
    if (userAddress) {
      return res.status(401).json({ error: 'Address looks similar' });
    }
    const latitude = '';
    const longitude = '';

    userAddress = await Address.create({
      name,
      address,
      addressLineTwo,
      zipcode,
      number,
      neighborhood,
      userId,
      latitude,
      longitude,
      city,
      clientId,
    });
    return res.json(userAddress);
  }

  async delete(req, res) {
    const { addressId } = req.params;

    const address = await Address.findByPk(addressId);

    if (!address) {
      return res.status(401).json({ error: 'Address not found' });
    }

    await address.destroy();

    return res.json({ message: 'Address deleted' });
  }

  async index(req, res) {
    const { userId, clientId } = req.body;

    if (!clientId && !userId) {
      return res.status(401).json('Client or User Id must be informed');
    }

    if (clientId) {
      const client = await Client.findByPk(clientId);
      if (!client) {
        return res.status(401).json({ error: 'Client not found' });
      }
    }

    if (!clientId && userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
    }

    const addresses = await Address.findAll({
      where: {
        [Op.or]: [
          {
            clientId: {
              [Op.eq]: clientId,
            },
          },
          {
            userId: { [Op.eq]: userId },
          },
        ],
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: Client,
          as: 'client',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(addresses);
  }
}

export default new AddressController();
