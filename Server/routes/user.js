const express = require('express');
const router = express.Router();
const { handelUserSignUp, handelUserLogin,getUserInfo} = require('../collection/user');
// const authMiddleware = require('../middleware/authMiddleware');


router.post('/signup', handelUserSignUp);
router.post('/login', handelUserLogin);
// router.get('/me',authMiddleware ,getUserInfo)

module.exports = router;
