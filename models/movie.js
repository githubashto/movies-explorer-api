const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: /https?:\/\/(www\.)?[-a-zA-Z\d.]{2,251}\/?[-a-zA-Z\d._~:/?#[\]@!$&'()*+,;=]*/,
  },
  trailer: {
    type: String,
    required: true,
    match: /https?:\/\/(www\.)?[-a-zA-Z\d.]{2,251}\/?[-a-zA-Z\d._~:/?#[\]@!$&'()*+,;=]*/,
  },
  thumbnail: {
    type: String,
    required: true,
    match: /https?:\/\/(www\.)?[-a-zA-Z\d.]{2,251}\/?[-a-zA-Z\d._~:/?#[\]@!$&'()*+,;=]*/,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
