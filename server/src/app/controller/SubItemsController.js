import Product from '../models/Product';
import SubItem from '../models/SubItem';
import ProductsItems from '../models/ProductsItems';

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

    const subItem = await SubItem.findByPk(subItemId);

    if (!subItem) {
      return res.json({ error: 'Sub item not found' });
    }
    const subItemToUpdate = req.body.SubItem;
    const productItems = await ProductsItems.findOne({
      where: { SubItemId: subItemId },
    });
    const { min, max, mandatory } = subItemToUpdate.ProductsItems;
    const updatedSubItem = await subItem.update(subItemToUpdate);

    if (min || max || mandatory) {
      const product = await Product.findByPk(productItems.ProductId);

      if (!product) {
        return res.status(401).json('Product not found');
      }

      await productItems.update({ min, max, mandatory });
    }
    return res.json(updatedSubItem);
  }

  async delete(req, res) {
    const { subItemId } = req.params;
    const subItem = await SubItem.findByPk(subItemId);

    if (!subItem) {
      return res.json({ error: 'Sub item not found' });
    }

    await subItem.destroy();
    return res.json();
  }
}
export default new SubItemsController();
