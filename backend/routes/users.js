const router = require('express').Router();
const { validateUserId, validateUpdateProfile, validateUpdateAvatar } = require('../middlewares/validation');

const {
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/user');

// router.use(auth);
router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', validateUserId, getUserId);
router.patch('/users/me', validateUpdateProfile, updateUser);
router.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
