const express = require("express");

const routes = express.Router();

routes.get("/teste", (request, response) => {
  return response.send("Hello Rocket");
});

module.exports = routes;
