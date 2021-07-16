require('dotenv').config();
const jwt = require('jsonwebtoken');

const AuthError = require('../errors/auth-err');

const errorMessages = require('../utils/utils');

const handleAuthError = () => {
  throw new AuthError(errorMessages.authErrDefault);
};

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }

  const token = authorization.replace(/^Bearer\s+/, '');

  let payload;

  try {
    payload = jwt.verify(token,
      JWT_SECRET);
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  return next();
};
