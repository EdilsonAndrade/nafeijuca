import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        gender: Sequelize.INTEGER,
        birthDate: Sequelize.INTEGER,
        password: Sequelize.STRING,
        confirmed: Sequelize.BOOLEAN,
        expiration: Sequelize.DATE,
        isAdmin: Sequelize.BOOLEAN,
        systemAdmin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async user => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });

    this.addHook('beforeUpdate', async user => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Store, { foreignKey: 'storeId', as: 'store' });
    this.belongsTo(models.File, { foreignKey: 'avatarId', as: 'useravatar' });
    this.hasOne(models.Client, { foreignKey: 'userId' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  generateToken() {
    const { id } = this;
    const { isAdmin } = this;
    return {
      token: jwt.sign({ id, isAdmin }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };
  }
}

export default User;
