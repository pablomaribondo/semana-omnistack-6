const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./routes");

const app = express();

const uri = process.env.MONGO_ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const port = 3333;
app.listen(port);
