import Product from '../models/Product';
import SubItem from '../models/SubItem';

class SubItemsController {
  async store(req, res) {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(401).json('Product not found');
    }
    const subItemToSave = req.body.SubItem;
    const { min, max, mandatory } = subItemToSave.ProductsItems;
    const subitem = await SubItem.create(subItemToSave);

    await subitem.addProduct(product, {
      through: { min, max, mandatory },
    });

    return res.json(subitem);
  }

  async update(req, res) {
    const { subItemId } = req.params;
    const { id } = req.body;
    console.log(`cheguei aqui com ${req.body}`);
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(401).json('Product not found');
    }
    const subItem = await SubItem.findByPk(subItemId);

    if (!subItem) {
      return res.json({ error: 'Sub item not found' });
    }
    const subItemToUpdate = req.body.SubItem;
    const { min, max, mandatory } = subItemToUpdate.ProductsItems;
    // TODO
    // https://sequelize.readthedocs.io/en/latest/docs/associations/
    const updatedSubItem = await subItem.update(subItemToUpdate);
    await subitem.setProduct(product, {
      through: { min, max, mandatory },
    });
    return res.json(updatedSubItem);
  }
}
export default new SubItemsController();
