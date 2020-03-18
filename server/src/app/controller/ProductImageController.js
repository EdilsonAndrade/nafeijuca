import File from '../models/File';
import Product from '../models/Product';

class ProductImageController {
  async update(req, res) {
    const { productId } = req.params;

    const { originalname: name, filename: path } = req.file;
    if (!name) {
      return res.status(401).json({ error: 'An image must be send' });
    }
    const file = await File.create({
      name,
      path,
    });

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(401).json({ error: 'Product not found' });
    }

    await product.update({
      imageId: file.id,
    });

    const productUpdated = await Product.findByPk(productId, {
      include: [
        {
          model: File,
          attributes: ['path', 'name'],
        },
      ],
    });
    return res.json(productUpdated);
  }
}

export default new ProductImageController();
