import File from '../models/File';

class FileUploadController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    if (!name) {
      return res.status(401).json({ error: 'An imagem must be send' });
    }
    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileUploadController();
