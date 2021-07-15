const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');

const errorMessages = require('../utils/utils');

const {
  createUser, login,
} = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string().required(),
  }),
},
{
  messages: {
    'string.empty': errorMessages.validErrUserCreate,
    'string.min': errorMessages.validErrUserCreate,
    'string.max': errorMessages.validErrUserCreate,
    'any.required': errorMessages.validErrUserCreate,
    'string.email': errorMessages.validErrUserEmail,
  },
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required(),
  }),
},
{
  messages: {
    'string.empty': errorMessages.authErrWrong,
    'any.required': errorMessages.authErrWrong,
    'string.email': errorMessages.validErrUserEmail,
  },
}), login);

router.use(auth);
router.use('/movies', require('./movies'));
router.use('/users', require('./users'));

router.use(() => {
  throw new NotFoundError(errorMessages.notfoundErrDefault);
});

module.exports = router;
