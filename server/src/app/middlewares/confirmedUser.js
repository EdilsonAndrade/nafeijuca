import User from '../models/User';

export default async (req, res, next) => {
  const { userId } = req;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }
  if (!user.isAdmin && !user.confirmed) {
    return res.status(401).json({ error: 'User not confirmed' });
  }
  return next();
};
