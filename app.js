const path = require('path');
const express = require('express');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:3001', 'http://nutag.nomoredomains.club', 'https://nutag.nomoredomains.club', 'http://www.nutag.nomoredomains.club', 'https://www.nutag.nomoredomains.club', 'http://178.154.229.30', 'https://178.154.229.30'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

require('dotenv').config();

const { PORT = 3000 } = process.env;

const { requestLogger, errorLogger } = require('./middlewares/logger');

const mongoose = require('mongoose');

const { isCelebrateError } = require('celebrate');

const router = require('./routes/index');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(requestLogger);

app.use(cors(corsOptions));
app.use('/', router);

app.use(express.static(path.join(__dirname, 'public')));

app.use(errorLogger);

app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (isCelebrateError(err)) {
    statusCode = 400;
    const errorBody = err.details.get('body');
    const { details: [errorDetails] } = errorBody;
    message = errorDetails.message;
  }
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
