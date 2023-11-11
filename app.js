const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const prostate = require("./routes/prostate");

const app = express();

const MONGODB_CONNECT = 'mongodb://localhost:27017/AutofillTest';

mongoose
  .connect(
      MONGODB_CONNECT
  )
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.log(err));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// define routes here...

app.use(`/api/prostate`, prostate);

module.exports = app;