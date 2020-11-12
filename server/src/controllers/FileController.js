const Box = require("../models/Box");
const File = require("../models/File");

class FileController {
  async store(request, response) {
    const { id } = request.params;
    const { key: path, originalname: title } = request.file;

    const box = await Box.findById(id);

    const file = await File.create({ title, path });

    box.files.push(file);

    await box.save();

    return response.json(file);
  }
}

module.exports = new FileController();
