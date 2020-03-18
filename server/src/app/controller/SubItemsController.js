import Product from '../models/Product';
import SubItem from '../models/SubItem';

class SubItemsController {
  async store(req, res) {
    const { productId } = req.params;
    const { subproductId, comments } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(401).json('Product not found');
    }
    const subItem = await Product.findByPk(subproductId);
    console.log(`subproduct id = ${subproductId}`);
    if (!subItem) {
      return res.status(401).json({ error: 'Sub Product not found' });
    }

    const subitem = await SubItem.create({
      productId,
      subproductId,
      comments,
    });

    return res.json(subitem);
  }

  async index(req, res) {
    const { productId } = req.params;
    const products = await SubItem.findAll({
      where: { productId },
      include: [
        {
          model: Product,
          as: 'ProductSubitem',
        },
      ],
    });
    if (!products) {
      return res.status(401).json('Product not found');
    }

    return res.json(products);
  }
}
export default new SubItemsController();
