const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status('201').send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Удаление чужой карточки'));
      }
      return Card.findByIdAndDelete(cardId)
        .populate(['owner', 'likes'])
        .then((ownersCard) => {
          if (!ownersCard) {
            return next(new NotFoundError('Карточка не найдена'));
          }
          return res.send({ data: ownersCard });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.addLike = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;
  return Card.findByIdAndUpdate(cardId, { $addToSet: { likes: ownerId } }, {
    new: true,
  })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      return res.send({ data: card });
    })
    .catch((err) => next(err));
};

module.exports.removeLike = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;
  return Card.findByIdAndUpdate(cardId, { $pull: { likes: ownerId } }, {
    new: true,
  })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      return res.send({ data: card });
    })
    .catch((err) => next(err));
};
