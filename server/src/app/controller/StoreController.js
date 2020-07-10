import * as Yup from 'yup';
import Store from '../models/Store';
import Geolocalization from '../../lib/Geolocalization';

class StoreController {
  async store(req, res) {
    const {
      name,
      zipcode,
      address,
      addresslinetwo,
      number,
      neighborhood,
      cnpj,
      active,
      city,
    } = req.body;
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      zipcode: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.string().required(),
      neighborhood: Yup.string().required(),
      cnpj: Yup.string().required(),
      city: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Store address fields are all required' });
    }

    const existStore = await Store.findOne({ where: { cnpj, address } });
    if (existStore) {
      return res
        .status(400)
        .json({ error: 'Store already exists', store: existStore });
    }
    const geo = await Geolocalization.findLatAndLongByZipCode({
      address: `${number}, ${address}, ${city}`,
    });
    const { latitude, longitude } = geo;

    const newStore = await Store.create({
      name,
      zipcode,
      address,
      addresslinetwo,
      number,
      neighborhood,
      cnpj,
      active,
      city,
      latitude,
      longitude,
    });

    return res.json(newStore);
  }

  async update(req, res) {
    const {
      name,
      zipcode,
      address,
      addresslinetwo,
      number,
      neighborhood,
      cnpj,
      active,
      city,
    } = req.body;

    const { storeId } = req.params;
    const existStore = await Store.findByPk(storeId);
    if (!existStore) {
      return res
        .status(400)
        .json({ error: 'Store doesnt exists', store: existStore });
    }
    const geo = await Geolocalization.findLatAndLongByZipCode({
      address: `${number}, ${address}, ${city}`,
    });
    const { latitude, longitude } = geo;

    await Store.update(
      {
        name,
        zipcode: geo.zipcode || zipcode,
        address,
        addresslinetwo,
        number,
        neighborhood,
        cnpj,
        active,
        city,
        latitude,
        longitude,
      },
      { where: { id: storeId } }
    );

    const storeupdated = await Store.findByPk(storeId);
    return res.json(storeupdated);
  }

  async delete(req, res) {
    const { storeId } = req.params;

    const existStore = await Store.findByPk(storeId);
    if (!existStore) {
      return res
        .status(400)
        .json({ error: 'Store doesnt exists', store: existStore });
    }

    await Store.update(
      {
        active: false,
      },
      { where: { id: storeId } }
    );

    return res.json(await Store.findByPk(storeId));
  }

  async index(req, res) {
    const stores = await Store.findAll();

    return res.json(stores);
  }
}

export default new StoreController();
