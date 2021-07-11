const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.Joi.number().integer().required(),
    description: Joi.string().required(),
    image: Joi.string().uri({
      scheme: /https?/,
    }).required(),
    trailer: Joi.string().uri({
      scheme: /https?/,
    }).required(),
    thumbnail: Joi.string().uri({
      scheme: /https?/,
    }).required(),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
},
{
  messages: {
    'string.empty': 'Переданы некорректные данные при создании карточки.',
    'string.min': 'Переданы некорректные данные при создании карточки.',
    'string.max': 'Переданы некорректные данные при создании карточки.',
    'any.required': 'Переданы некорректные данные при создании карточки.',
    'string.uri': 'Переданы некорректные данные при создании карточки.',
    'string.uriCustomScheme': 'Переданы некорректные данные при создании карточки.',
  },
}), createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
