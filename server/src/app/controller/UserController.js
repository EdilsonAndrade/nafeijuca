import * as Yup from 'yup';
import Queue from '../../lib/Queue';
import ConfirmationMail from '../jobs/ConfirmationMail';
import User from '../models/User';
import Store from '../models/Store';
import File from '../models/File';
import '../../bootstrap';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
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
      avatarId,
    });
    Queue.add(ConfirmationMail.key, {
      user,
    });

    const returned = {
      name,
      email,
      birthDate,
      gender,
      confirmed: confirmedForAdmin,
      isAdmin,
      storeId,
      expiration: user.expiration,
    };

    return res.json(returned);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(5),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      oldEmail: Yup.string().email(),
      email: Yup.string()
        .email()
        .when('oldEmail', (oldEmail, field) =>
          oldEmail ? field.required() : field
        ),
    });
    const { userId } = req;
    const {
      name,
      email,
      birthDate,
      gender,
      password,
      oldPassword,
      oldEmail,
      isAdmin,
      storeId,
    } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation input failed' });
    }

    const user = await User.findByPk(userId);

    if (oldPassword && password) {
      if (!(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password Invalid' });
      }
    }
    if (email && !oldEmail) {
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

    await user.update({
      name,
      email,
      birthDate,
      gender,
      password,
      confirmed: confirmedForAdmin,
      isAdmin,
      storeId,
    });

    if (!isAdmin) {
      if (oldEmail && email && user.email === email) {
        Queue.add(ConfirmationMail.key, {
          user,
        });
      }
    }
    const returned = {
      name,
      email,
      birthDate,
      gender,
      confirmed: confirmedForAdmin,
      isAdmin,
      storeId,
    };

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
