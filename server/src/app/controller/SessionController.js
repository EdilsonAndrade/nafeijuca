import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    const { id, name, isAdmin } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        isAdmin,
      },
      token: jwt.sign({ id, isAdmin }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
