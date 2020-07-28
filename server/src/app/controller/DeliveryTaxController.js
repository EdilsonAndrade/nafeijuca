import DeliveryTax from '../models/DeliveryTax';
import Store from '../models/Store';

class DeliveryTaxController {
  async store(req, res) {
    const { km, tax, freeTax } = req.body;
    const { storeId } = req.params;
    if (km === undefined || tax === undefined || km <= 0) {
      return res.status(400).json({ error: 'Km / Tax invalid' });
    }

    const deliveryTax = await DeliveryTax.create({
      km,
      tax,
      freeTax,
      storeId,
    });

    return res.json(deliveryTax);
  }

  async update(req, res) {
    const { deliveryTaxId } = req.params;
    const { km, tax, freeTax } = req.body;
    const deliveryTax = await DeliveryTax.findByPk(deliveryTaxId);

    if (!deliveryTax) {
      return res.status(404).json({ error: 'Delivery Tax not found' });
    }

    const updatedDeliveryTax = await deliveryTax.update({
      km,
      tax,
      freeTax,
    });

    return res.json(updatedDeliveryTax);
  }

  async index(req, res) {
    const { storeId } = req.params;

    const store = await DeliveryTax.findAll({
      where: { storeId },
      include: [
        {
          model: Store,
        },
      ],
    });

    if (!store) {
      return res.status(400).json({ error: 'Store Not found' });
    }
    return res.json(store);
  }
}
export default new DeliveryTaxController();
