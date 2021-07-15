require('dotenv').config();
const jwt = require('jsonwebtoken');

const AuthError = require('../errors/auth-err');

const errorMessages = require('../utils/utils');

const handleAuthError = () => {
  throw new AuthError(errorMessages.authErrDefault);
};

const { JWT_SECRET = '0de50296aeea456249151bd8278d04515e1f6a8d490db398ad285b0c3eec9676' } = process.env;

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
