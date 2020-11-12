const Box = require("../models/Box");

class BoxController {
  async show(request, response) {
    const { id } = request.params;

    const box = await Box.findById(id).populate({
      path: "files",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return response.json(box);
  }

  async store(request, response) {
    const { title } = request.body;
    const box = await Box.create({ title });

    return response.json(box);
  }
}

module.exports = new BoxController();
