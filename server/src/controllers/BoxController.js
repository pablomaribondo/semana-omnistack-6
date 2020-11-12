const Box = require("../models/Box");

class BoxController {
  async store(request, response) {
    const { title } = request.body;
    const box = await Box.create({ title });

    return response.json(box);
  }
}

module.exports = new BoxController();
