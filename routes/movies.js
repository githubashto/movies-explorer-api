const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');

const errorMessages = require('../utils/utils');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().positive().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(errorMessages.validErrUrl);
    }).required(),
    trailer: Joi.string().uri().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(errorMessages.validErrUrl);
    }).required(),
    thumbnail: Joi.string().uri().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(errorMessages.validErrUrl);
    }).required(),
    movieId: Joi.number().integer().positive().required(),
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
    'string.uri': errorMessages.validErrUrl,
    'number.base': errorMessages.validErrMovieCreate,
    'number.positive': errorMessages.validErrMovieCreate,
  },
}), createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
