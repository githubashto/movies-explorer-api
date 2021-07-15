const { isCelebrateError } = require('celebrate');

const errorMessages = require('../utils/utils');

module.exports = (err, req, res, next) => {
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
};
