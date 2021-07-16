const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const errorMessages = require('../utils/utils');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
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
  }),
},
{
  messages: {
    'string.empty': errorMessages.validErrMovieCreate,
    'string.min': errorMessages.validErrMovieCreate,
    'string.max': errorMessages.validErrMovieCreate,
    'any.required': errorMessages.validErrMovieCreate,
    'string.base': errorMessages.validErrMovieCreate,
    'string.uri': errorMessages.validErrMovieCreate,
    'string.uriCustomScheme': errorMessages.validErrMovieCreate,
  },
}), createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
