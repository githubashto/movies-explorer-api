const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');

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
    'string.empty': 'Переданы некорректные данные при создании пользователя.',
    'string.min': 'Переданы некорректные данные при создании пользователя.',
    'string.max': 'Переданы некорректные данные при создании пользователя.',
    'any.required': 'Переданы некорректные данные при создании пользователя.',
    'string.email': 'Переданы некорректные данные при создании пользователя.',
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
    'string.empty': 'Переданы некорректные данные при попытке входа.',
    'any.required': 'Переданы некорректные данные при попытке входа.',
    'string.email': 'Переданы некорректные данные при попытке входа.',
  },
}), login);

router.use(auth);
router.use('/movies', require('./movies'));
router.use('/users', require('./users'));

router.use(() => {
  throw new NotFoundError('Такой страницы нет.');
});

module.exports = router;
