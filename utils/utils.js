const errorMessages = {
  serverErrDefault: 'На сервере произошла ошибка.',
  authErrDefault: 'Необходима авторизация.',
  authErrWrong: 'Неправильные почта или пароль.',
  notfoundErrDefault: 'Такой страницы нет.',
  notfoundErrUser: 'Пользователь по указанному _id не найден.',
  notfoundErrMovie: 'Фильм с указанным _id не найден.',
  validErrCast: 'Некорректный _id.',
  validErrUserCreate: 'Переданы некорректные данные при регистрации пользователя.',
  validErrUserEdit: 'Переданы некорректные данные при обновлении профиля.',
  validErrMovieCreate: 'Переданы некорректные данные при добавлении фильма.',
  validErrUrl: 'Некорректная ссылка.',
  validErrUserEmail: 'Некорректный email.',
  conflictErrCreate: 'Вы уже регистрировались.',
  conflictErrEdit: 'Такой email уже занят.',
  forbidErrMovie: 'Фильм с указанным _id не найден.',
  badErrLogin: 'Переданы некорректные данные при попытке входа.',
  tooManyReq: 'Слишком много запросов, попробуйте позже.',
};

module.exports = errorMessages;
