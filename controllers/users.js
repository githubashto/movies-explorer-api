require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const ValidationError = require('../errors/valid-err');
const AuthError = require('../errors/auth-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

const errorMessages = require('../utils/utils');

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .select('name email')
    .then((user) => {
      if (!user) {
        throw new AuthError(errorMessages.authErrDefault);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(errorMessages.notfoundErrUser));
      } else if (err.name === 'CastError') {
        next(new ValidationError(errorMessages.validErrCast));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ValidationError(errorMessages.validErrUserCreate));
        } else if (err.name === 'MongoError' && err.code === 11000) {
          next(new ConflictError(errorMessages.conflictErrCreate));
        } else {
          next(err);
        }
      }));
};

const { JWT_SECRET } = require('../config');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' });
      res.send({ token, data: user })
        .end();
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new ValidationError(errorMessages.validErrUserEdit);
  }
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail()
    .select('name email')
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.notfoundErrUser);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(errorMessages.validErrUserEdit));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(errorMessages.notfoundErrUser));
      } else if (err.name === 'CastError') {
        next(new ValidationError(errorMessages.validErrCast));
      } else if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError(errorMessages.conflictErrEdit));
      } else {
        next(err);
      }
    });
};
