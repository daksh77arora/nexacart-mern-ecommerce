const express = require('express');
const { registerUser, loginUser, getUsers, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getCurrentUser);
router.get('/users', protect, admin, getUsers);

module.exports = router;
