const express = require('express');
const router = express.Router();
const { handleQuizResult, getUserQuizResults,getLeaderboard } = require('../collection/report');

router.post('/result', handleQuizResult);
router.get('/results/:userId', getUserQuizResults);


module.exports = router;