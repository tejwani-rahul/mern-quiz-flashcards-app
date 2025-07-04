// routes/report.js
const express = require('express');
const router = express.Router();
const { handleQuizResult, getUserQuizResults } = require('../collection/report');
const authMiddleware = require("../middleware/authMiddleware");

// Save a quiz result
router.post('/result', authMiddleware, handleQuizResult);

//  Get results for the logged-in user using /me
router.get('/results/me', authMiddleware, getUserQuizResults);



module.exports = router;
