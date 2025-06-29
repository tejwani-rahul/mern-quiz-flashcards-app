// routes/report.js
const express = require('express');
const router = express.Router();
const { handleQuizResult, getUserQuizResults } = require('../collection/report');
const authMiddleware = require("../middleware/authMiddleware");

// Save a quiz result
router.post('/result', authMiddleware, handleQuizResult);

// ✅ NEW! Get results for the logged-in user using /me
router.get('/results/me', authMiddleware, getUserQuizResults);

// Or keep the old one if you ever want to get results for a specific user by ID
// router.get('/results/:userId', authMiddleware, async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const results = await QuizResult.find({ userId }).sort({ createdAt: -1 });
//     return res.status(200).json(results);
//   } catch (err) {
//     console.error("Fetch Results Error:", err);
//     return res.status(500).json({ error: "Failed to fetch results" });
//   }
// });

module.exports = router;
