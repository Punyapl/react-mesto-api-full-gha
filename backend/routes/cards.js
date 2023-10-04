const router = require('express').Router();
const { validateCreateCard, validateCardId } = require('../middlewares/validation');
const {
  createCard,
  getAllCards,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/card');

// router.use(auth);
router.get('/cards', getAllCards);
router.post('/cards', validateCreateCard, createCard);
router.delete('/cards/:cardId', validateCardId, deleteCard);
router.put('/cards/:cardId/likes', validateCardId, addLike);
router.delete('/cards/:cardId/likes', validateCardId, removeLike);

module.exports = router;
