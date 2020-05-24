/* eslint-disable consistent-return */
/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */

const jwt = require('jsonwebtoken');
const Error401 = require('../errors/err401');
// const { NODE_ENV, JWT_SECRET } = require('../config');
const { NODE_ENV, JWT_SECRET } = process.env;


module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send({ message: 'Необходимо авторизоваться!' });
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new Error401('Необходимо авторизоваться'));
  }
  // req.user = payload;
  req.user = payload;

  next();
};
