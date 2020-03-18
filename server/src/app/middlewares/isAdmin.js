import User from '../models/User';

export default async (req, res, next) => {
  const { userId } = req;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (user.isAdmin === false || !user.isAdmin) {
    return res.status(401).json({ error: 'User not allowed' });
  }
  return next();
};
