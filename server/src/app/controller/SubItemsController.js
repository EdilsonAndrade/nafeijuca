import Product from '../models/Product';
import SubItem from '../models/SubItem';

class SubItemsController {
  async store(req, res) {
    const { productId } = req.params;
    console.log(`inserir subitem= ${req.body}`);
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(401).json('Product not found');
    }

    const subitem = await SubItem.create({
      productId,
      ...req.body,
    });

    return res.json(subitem);
  }

  async update(req, res) {
    const { subItemId } = req.params;

    const subItem = await SubItem.findByPk(subItemId);

    if (!subItem) {
      return res.json({ error: 'Sub item not found' });
    }

    const updatedSubItem = await subitem.update(req.body);
    return res.json(updatedSubItem);
  }
}
export default new SubItemsController();
