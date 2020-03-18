import * as Yup from 'yup';
import { Op } from 'sequelize';
import Store from '../models/Store';
import Client from '../models/Client';
import User from '../models/User';
import Order from '../models/Order';
import Product from '../models/Product';
import OrderProduct from '../models/OrderProduct';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      storeId: Yup.number().required(),
    });
    const { clientId, userId, storeId, costTax } = req.body;
    const { products, productIds, ...data } = req.body;
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation failed' });
    }

    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(401).json({ error: 'Store not found' });
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

    if (!productIds || productIds.length <= 0) {
      res.status(401).json({ error: 'Product must be include in order' });
    }

    let total = 0;
    if (products) {
      products.forEach(product => {
        total +=
          product.price -
          (product.promotionPrice > 0 ? product.promotionPrice : 0);
      });
    }
    const subTotal = total;
    total += costTax > 0 ? +costTax : 0;
    data.total = total;
    data.subTotal = subTotal;

    const order = await Order.create(data);
    await order.setProducts(productIds);

    return res.json(order);
  }

  async index(req, res) {
    const { id } = req.params;

    const orders = await Order.findAll({
      where: {
        [Op.or]: [
          {
            clientId: {
              [Op.eq]: id,
            },
          },
          {
            userId: { [Op.eq]: id },
          },
        ],
      },
      include: [
        {
          model: OrderProduct,
          as: 'OrderProducts',
          attributes: ['id'],

          include: {
            model: Product,
          },
        },
      ],
    });
    return res.json(orders);
  }
}
export default new OrderController();
