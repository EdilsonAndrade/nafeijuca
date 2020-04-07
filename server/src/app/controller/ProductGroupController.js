import * as Yup from 'yup';
import ProductGroup from '../models/ProductGroup';
import Store from '../models/Store';
import Product from '../models/Product';

class ProductGroupController {
  async store(req, res) {
    const { storeId } = req.params;
    const store = await Store.findOne({ where: { id: storeId, active: true } });
    if (!store) {
      return res.status(400).json({ error: 'Store not found' });
    }
    const define = Yup.object().shape({
      name: Yup.string().required(),
      quantityTotal: Yup.number().required(),
    });

    if (!(await define.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const productGroup = await ProductGroup.create({ ...req.body, storeId });

    return res.json(productGroup);
  }

  async update(req, res) {
    const { productGroupId } = req.params;
    const define = Yup.object().shape({
      oldName: Yup.string(),
      name: Yup.string().when('oldName', (oldName, field) =>
        oldName ? field.required() : field
      ),
      oldQuantityTotal: Yup.number(),
      quantityTotal: Yup.number().when(
        'oldQuantityTotal',
        (oldQuantityTotal, field) =>
          oldQuantityTotal ? field.required() : field
      ),
    });

    if (!(await define.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const productGroup = await ProductGroup.findByPk(productGroupId);
    if (!productGroup) {
      return res.status(400).json({ error: 'Product Group not found' });
    }

    const updated = await productGroup.update(req.body);
    return res.json(updated);
  }

  async delete(req, res) {
    const { productGroupId } = req.params;

    const productGroup = await ProductGroup.findByPk(productGroupId);
    if (!productGroup) {
      return res.status(400).json({ error: 'Product Group not found' });
    }

    await productGroup.destroy();
    return res.json({ message: 'Product Group Deleted' });
  }

  async index(req, res) {
    const { storeId, productGroupId } = req.params;
    const store = await Store.findOne({ where: { id: storeId, active: true } });
    if (!store) {
      return res.status(400).json({ error: 'Store not found' });
    }

    if (productGroupId) {
      const productGroup = await ProductGroup.findAll({
        where: { id: productGroupId, storeId },
        include: [
          {
            model: Product,
          },
          {
            model: Store,
          },
        ],
      });
      return res.json(productGroup);
    }

    const productsGoups = await ProductGroup.findAll({
      where: { storeId },
      include: [
        {
          model: Store,
        },
        {
          model: Product,
          required: false,
        },
      ],
    });

    return res.json(productsGoups);
  }
}

export default new ProductGroupController();
