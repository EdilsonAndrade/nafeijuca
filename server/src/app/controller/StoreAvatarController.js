import File from '../models/File';
import Store from '../models/Store';

class StoreAvatarController {
  async update(req, res) {
    const { storeId } = req.params;

    const { originalname: name, filename: path } = req.file;
    if (!name) {
      return res.status(401).json({ error: 'An image must be send' });
    }
    const file = await File.create({
      name,
      path,
    });

    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(401).json({ error: 'Store not found' });
    }

    await store.update({
      imageId: file.id,
    });

    const storeUpdated = await Store.findByPk(storeId, {
      include: [
        {
          model: File,
          attributes: ['path', 'name'],
        },
      ],
    });
    return res.json(storeUpdated);
  }
}

export default new StoreAvatarController();
