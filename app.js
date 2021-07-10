const path = require('path');
const express = require('express');
const cors = require('cors');
const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { isCelebrateError } = require('celebrate');

const app = express();

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
