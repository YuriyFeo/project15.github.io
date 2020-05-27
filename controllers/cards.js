const cardModel = require('../models/card.js');

const Error404 = require('../errors/err404');
const Error403 = require('../errors/err403');

// возвращает все карточки
module.exports.getCards = (req, res, next) => {
  cardModel.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// создаёт карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

//  удаляет карточку по идентификатору
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;

  cardModel.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new Error404('Нет карточки с таким id');
      }
      return card.owner.equals(ownerId);
    })
    .then((isMatch) => {
      if (!isMatch) {
        throw new Error403('Невозможно удалить чужую карточку');
      }
      return cardModel.findByIdAndRemove(cardId);
    })
    .then((cardRemove) => {
      if (!cardRemove) {
        throw new Error403('Невозможно удалить чужую карточку');
      }
      res.send({ remove: cardRemove });
    })
    .catch(next);
};
