const path = require('path');
const express = require('express');

const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:3001',
    'http://urlag.nomoredomains.club',
    'http://urlag.nomoredomains.club:3001',
    'https://urlag.nomoredomains.club',
    'https://urlag.nomoredomains.club:3001',
    'http://www.urlag.nomoredomains.club',
    'http://www.urlag.nomoredomains.club:3001',
    'https://www.urlag.nomoredomains.club',
    'https://www.urlag.nomoredomains.club:3001'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

require('dotenv').config();

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const mongoose = require('mongoose');

const { isCelebrateError } = require('celebrate');

const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = require('./middlewares/limiter');

const router = require('./routes/index');

const app = express();

const errorMessages = require('./utils/utils');

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(helmet());

app.use(requestLogger);

app.use(limiter);

app.use(cors(corsOptions));
app.use(router);

app.use(express.static(path.join(__dirname, 'public')));

app.use(errorLogger);

app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  if (isCelebrateError(err)) {
    statusCode = 400;

    const errorBody = err.details.has('body')
      ? err.details.get('body')
      : err.details.get('params');

    const { details: [errorDetails] } = errorBody;
    message = errorDetails.message;
  }
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? errorMessages.serverErrDefault
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
