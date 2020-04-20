import * as Yup from 'yup';
import Product from '../models/Product';
import Store from '../models/Store';
import ProductGroup from '../models/ProductGroup';
import SubItem from '../models/SubItem';
import File from '../models/File';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      equivalentAmount: Yup.number().required(),
      price: Yup.number().required(),
      storeId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation failed' });
    }

    const { storeId } = req.body;
    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(401).json({ error: 'Store not found' });
    }
    const productExist = await Product.findOne({
      where: { name: req.body.name },
    });
    if (productExist) {
      return res.status(401).json({ error: 'Product already exists' });
    }
    const product = await Product.create(req.body);

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

    const product = await Product.findByPk(productId, {
      include: [
        {
          model: File,
        },
        {
          model: SubItem,
        },
      ],
    });
    if (!product) {
      return res.status(401).json({ error: 'Product not found' });
    }

    await product.destroy();

    if (product.File) {
      const file = await File.findByPk(product.File.id);
      file.destroy();
    }
    if (product.SubItem) {
      const subItem = await SubItem.findByPk(product.SubItem.id);
      await subItem.destroy();
    }

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
        {
          model: SubItem,
        },
        {
          model: File,
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
        {
          model: SubItem,
        },
      ],
    });

    return res.json(products);
  }
}

export default new ProductController();
