const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMe, updateUserInfo,
} = require('../controllers/users');

router.get('/me', getMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
},
{
  messages: {
    'string.empty': 'Переданы некорректные данные при обновлении пользователя.',
    'string.min': 'Переданы некорректные данные при обновлении пользователя.',
    'string.max': 'Переданы некорректные данные при обновлении пользователя.',
    'string.email': 'Переданы некорректные данные при обновлении пользователя.',
  },
}), updateUserInfo);

module.exports = router;
