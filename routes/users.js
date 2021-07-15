const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMe, updateUserInfo,
} = require('../controllers/users');

const errorMessages = require('../utils/utils');

router.get('/me', getMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
},
{
  messages: {
    'string.empty': errorMessages.validErrUserEdit,
    'string.min': errorMessages.validErrUserEdit,
    'string.max': errorMessages.validErrUserEdit,
    'string.email': errorMessages.validErrUserEmail,
  },
}), updateUserInfo);

module.exports = router;
