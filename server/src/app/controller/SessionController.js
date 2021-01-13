import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';
import Store from '../models/Store';
import File from '../models/File';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
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
        'password',
        'confirmed',
      ],
    });
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    const loggedUser = await User.findByPk(user.id, {
      include: [
        {
          model: Store,
          as: 'store',
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
      ],
    });
    return res.json({
      user: loggedUser,
      token: jwt.sign({ id: user.id, isAdmin: user.isAdmin }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
