import * as Yup from 'yup';
import Product from '../models/Product';
import Store from '../models/Store';
import ProductGroup from '../models/ProductGroup';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      equivalentAmount: Yup.number().required(),
      price: Yup.number().required(),
      storeId: Yup.number().required(),
      weekdaysActive: Yup.array().required(),
    });

    const { weekdaysActive } = req.body;
    let indice = 0;
    let weekDays = '';
    weekdaysActive.forEach(d => {
      if (d === true) {
        weekDays += `${indice},`;
      }
      indice += 1;
    });
    weekDays = weekDays.substr(0, weekDays.length - 1);

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation failed' });
    }

    const { storeId } = req.body;
    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(401).json({ error: 'Store not found' });
    }
    console.log(`nome do produto = ${req.body.name}`);
    const productExist = await Product.findOne({
      where: { name: req.body.name },
    });
    console.log(JSON.stringify(productExist));
    if (productExist) {
      return res.status(401).json({ error: 'Product already exists' });
    }
    const data = { ...req.body, weekdaysActive: weekDays };
    const product = await Product.create(data);

    return res.json(product);
  }

  async update(req, res) {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(401).json({ error: 'Product not found' });
    }

    const updatedProduct = await product.update(req.body);

    return res.json(updatedProduct);
  }

  async delete(req, res) {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(401).json({ error: 'Product not found' });
    }

    await product.destroy();

    return res.json({ message: 'Product deleted' });
  }

  async index(req, res) {
    const { productId, storeId } = req.params;

    const product = await Product.findByPk(productId, {
      include: [
        {
          model: ProductGroup,
          required: false,
        },
        {
          model: Store,
        },
      ],
    });
    if (productId && !product) {
      return res.status(401).json({ error: 'Product not found' });
    }

    if (productId) {
      return res.json(product);
    }

    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(401).json({ error: 'Store not found' });
    }

    const products = await Product.findAll({
      where: { storeId },
      include: [
        {
          model: ProductGroup,
          required: false,
        },
        {
          model: Store,
        },
      ],
    });

    return res.json(products);
  }
}

export default new ProductController();
