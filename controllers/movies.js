const Movie = require('../models/movie');

const ValidationError = require('../errors/valid-err');
const ForbiddenError = require('../errors/forbid-err');
const NotFoundError = require('../errors/not-found-err');

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
        throw new ValidationError('Переданы некорректные данные при добавлении фильма.');
      } else {
        throw err;
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден.');
      }
      if (movie.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужой фильм.');
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .orFail()
        .select('country director duration year description image trailer thumbnail movieId nameRU nameEN')
        .then((result) => res.send(result))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Фильм с указанным _id не найден.');
      } else if (err.name === 'CastError') {
        throw new ValidationError('Некорректный _id.');
      } else {
        throw err;
      }
    })
    .catch(next);
};
