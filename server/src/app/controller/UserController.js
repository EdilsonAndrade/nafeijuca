import * as Yup from 'yup';
import { Op } from 'sequelize';
import Queue from '../../lib/Queue';
import ConfirmationMail from '../jobs/ConfirmationMail';
import User from '../models/User';
import Store from '../models/Store';
import File from '../models/File';
import '../../bootstrap';

class UserController {
  async index(req, res) {
    const { storeId } = req.params;
    if (storeId) {
      const users = await User.findAll({
        where: { storeId },
        include: [
          {
            model: Store,
            as: 'store',
            attributes: [
              'id',
              'cnpj',
              'name',
              'address',
              'number',
              'zipcode',
              'neighborhood',
              'addressLineTwo',
            ],
          },
          {
            model: File,
            as: 'useravatar',
          },
        ],
        attributes: ['id', 'name', 'email', 'gender', 'birthDate', 'isAdmin'],
      });

      return res.json(users);
    }
    const users = await User.findAll({
      where: {
        [Op.or]: [
          {
            systemAdmin: {
              [Op.eq]: null,
            },
          },
          {
            systemAdmin: { [Op.eq]: false },
          },
        ],
      },
      include: [
        {
          model: Store,
          as: 'store',
          attributes: [
            'id',
            'cnpj',
            'name',
            'address',
            'number',
            'zipcode',
            'neighborhood',
            'addressLineTwo',
          ],
        },
        {
          model: File,
          as: 'useravatar',
        },
      ],
      attributes: ['id', 'name', 'email', 'gender', 'birthDate', 'isAdmin'],
    });

    return res.json(users);
  }

  async store(req, res) {
    const {
      name,
      email,
      birthDate,
      gender,
      password,
      isAdmin,
      storeId,
      avatarId,
      systemAdmin,
    } = req.body;
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(5),
      password: Yup.string()
        .required()
        .min(6),
      email: Yup.string()
        .required()
        .email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation input failed' });
    }
    let user = '';
    if (!isAdmin) {
      user = await User.findOne({ where: { email, storeId } });
    } else {
      user = await User.findOne({ where: { email } });
    }

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const store = await Store.findByPk(storeId);
    if (!isAdmin && (!store || !store.active)) {
      return res.status(404).json({ error: 'Store not found' });
    }
    let confirmedForAdmin = false;
    if (isAdmin) {
      confirmedForAdmin = true;
    } else {
      confirmedForAdmin = false;
    }
    user = await User.create({
      name,
      email,
      birthDate,
      gender,
      password,
      expiration: new Date(),
      confirmed: confirmedForAdmin,
      isAdmin,
      storeId,
      avatarId: avatarId === '' ? null : avatarId,
      systemAdmin,
    });
    Queue.add(ConfirmationMail.key, {
      user,
    });

    const returned = await User.findByPk(user.id, {
      include: [
        {
          model: Store,
          as: 'store',
          attributes: [
            'id',
            'cnpj',
            'name',
            'address',
            'number',
            'zipcode',
            'neighborhood',
            'addressLineTwo',
          ],
        },
        {
          model: File,
          as: 'useravatar',
        },
      ],
      attributes: [
        'id',
        'name',
        'email',
        'gender',
        'birthDate',
        'isAdmin',
        'systemAdmin',
        'expiration',
      ],
    });

    return res.json(returned);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(5),
      oldPassword: Yup.string(),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      oldEmail: Yup.string().email(),
      email: Yup.string()
        .email()
        .when('oldEmail', (oldEmail, field) =>
          oldEmail ? field.required() : field
        ),
    });
    let { userId } = req;

    const {
      id,
      name,
      email,
      birthDate,
      gender,
      password,
      oldPassword,
      oldEmail,
      isAdmin,
      storeId,
      isUserAdmin,
      avatarId,
      systemAdmin,
    } = req.body;

    if (isUserAdmin && req.body.id) {
      userId = req.body.id;
    }
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation input failed' });
    }

    const user = await User.findByPk(userId);

    if (!isUserAdmin && oldPassword && password) {
      if (!(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password Invalid' });
      }
    }
    if (!isUserAdmin && email && !oldEmail) {
      return res
        .status(401)
        .json({ error: 'To change e-mail, old e-mail must be informed' });
    }

    let confirmedForAdmin = false;

    if (isAdmin) {
      confirmedForAdmin = true;
    } else {
      confirmedForAdmin = oldEmail ? false : user.confirmed;
    }
    if (!password) {
      await User.update(
        {
          name,
          email,
          birthDate,
          gender,
          confirmed: confirmedForAdmin,
          isAdmin,
          storeId,
          avatarId: avatarId === '' ? null : avatarId,
          systemAdmin,
        },
        { where: { id } }
      );
    } else {
      await user.update({
        name,
        email,
        birthDate,
        gender,
        password,
        confirmed: confirmedForAdmin,
        isAdmin,
        storeId,
        avatarId: avatarId === '' ? null : avatarId,
        systemAdmin,
      });
    }

    if (!isAdmin) {
      if (oldEmail && email && user.email === email) {
        Queue.add(ConfirmationMail.key, {
          user,
        });
      }
    }
    const returned = await User.findByPk(user.id, {
      include: [
        {
          model: Store,
          as: 'store',
          attributes: [
            'id',
            'cnpj',
            'name',
            'address',
            'number',
            'zipcode',
            'neighborhood',
            'addressLineTwo',
          ],
        },
        {
          model: File,
          as: 'useravatar',
        },
      ],
      attributes: [
        'id',
        'name',
        'email',
        'gender',
        'birthDate',
        'isAdmin',
        'systemAdmin',
        'confirmed',
        'expiration',
      ],
    });

    return res.json(returned);
  }

  async delete(req, res) {
    const { userId } = req.params;
    const { isAdmin } = req;
    if (!isAdmin) {
      return res.status(401).json({ error: 'User logged is not admin' });
    }
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { email } = user;

    await user.destroy();
    return res.json({ message: `User ${email} deleted successfully` });
  }
}

export default new UserController();
