const express = require('express');
const router = express.Router();
const { handelUserSignUp, handelUserLogin, getUserInfo } = require('../collection/user');
const authenticateUser = require('../middleware/authMiddleware');

router.post('/signup', handelUserSignUp);
router.post('/login', handelUserLogin);
router.get('/me', authenticateUser, getUserInfo);

module.exports = router;
