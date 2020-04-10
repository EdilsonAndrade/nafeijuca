import Cryptr from 'cryptr';
import * as Yup from 'yup';
import { addMinutes } from 'date-fns';
import Queue from '../../lib/Queue';
import ConfirmationMail from '../jobs/ConfirmationMail';
import User from '../models/User';

class ConfirmationController {
  async index(req, res) {
    const cryptr = new Cryptr(process.env.CRYPTKEY);
    const { userId } = req.params;
    const id = cryptr.decrypt(userId);

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { updatedAt } = user;
    if (new Date() > addMinutes(updatedAt, 60)) {
      return res.status(401).json({ error: 'Confirmation link expired' });
    }

    await user.update({
      confirmed: true,
    });
    return res.json(user);
  }

  async update(req, res) {
    const { email } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string()
        .required()
        .email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation input failed' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    user.confirmed = false;
    user.expiration = new Date();
    user.save();
    Queue.add(ConfirmationMail.key, {
      user,
    });
    return res.json(user);
  }
}

export default new ConfirmationController();
