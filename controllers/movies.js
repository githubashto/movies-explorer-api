const Movie = require('../models/movie');

const ValidationError = require('../errors/valid-err');
const ForbiddenError = require('../errors/forbid-err');
const NotFoundError = require('../errors/not-found-err');

const errorMessages = require('../utils/utils');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .select('country director duration year description image trailer thumbnail movieId nameRU nameEN')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(errorMessages.validErrMovieCreate));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMessages.notfoundErrMovie);
      }
      if (movie.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError(errorMessages.forbidErrMovie);
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .orFail()
        .select('country director duration year description image trailer thumbnail movieId nameRU nameEN')
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(errorMessages.notfoundErrMovie));
      } else if (err.name === 'CastError') {
        next(new ValidationError(errorMessages.validErrCast));
      } else {
        next(err);
      }
    });
};
