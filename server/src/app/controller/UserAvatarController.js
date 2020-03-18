import File from '../models/File';
import User from '../models/User';

class UserAvatarController {
  async update(req, res) {
    const { userId } = req;

    const { originalname: name, filename: path } = req.file;
    if (!name) {
      return res.status(401).json({ error: 'An image must be send' });
    }
    const file = await File.create({
      name,
      path,
    });

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    await user.update({
      avatarId: file.id,
    });

    const updatedUser = await User.findByPk(userId, {
      include: [
        {
          model: File,
          attributes: ['path', 'name'],
        },
      ],
    });
    return res.json(updatedUser);
  }
}

export default new UserAvatarController();
