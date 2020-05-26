// Для хеширования пароля модуль bcryptjs
const bcrypt = require('bcryptjs');
// Для создания токенов воспользуемся пакетом jsonwebtoken
const jwt = require('jsonwebtoken');
// импортируем схему
const userModel = require('../models/user.js');

const Error404 = require('../errors/err404');
const Error401 = require('../errors/err401');

const { SECRET } = require('../config');

// возвращает пользователя
module.exports.getUsers = (req, res, next) => {
  userModel.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

// находит пользователя по id
module.exports.findUser = (req, res, next) => {
  const { id } = req.params;
  userModel.findById({ _id: id })
    .then((user) => { if (user) { res.status(200).send({ data: user }); } else { next(new Error404('Нет пользователя с таким id')); } })
    .catch(next);
};

// создает пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  // хешируем пароль
  return bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.send({
      name,
      about,
      avatar,
      email,
    }))
    .catch(next);
};

// контроллер login, который получает из запроса почту и пароль и проверяет их
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      // создаем токен методом sign, передали два аргумента: _id и секретный ключ подписи
      // токен создается на 7 дней
      const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '7d' });
      // отправим токен, браузер сохранит его в куках
      res.cookie('jwt', token, {
        maxAge: 604800,
        httpOnly: true,
        sameSite: true,
        // secure: true,
      });
      res.status(200).send({ token });
    })
    .catch(() => next(new Error401('Ввели неправильно логин или пароль')));
};
