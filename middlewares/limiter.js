const rateLimit = require('express-rate-limit');
const errorMessages = require('../utils/utils');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: errorMessages.tooManyReq,
});

module.exports = limiter;
