// collection/report.js
const QuizResult = require('../models/report');

async function handleQuizResult(req, res) {
  const { topic, score, total, reviewItems } = req.body;
  const userId = req.user.userId; // ✅ Comes from authMiddleware

  if (!topic || score == null || total == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await QuizResult.create({
      userId,
      topic,
      score,
      total,
      reviewItems,
    });

    return res.status(201).json({ message: "Result saved", result });
  } catch (err) {
    console.error("Save Result Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ Updated to use req.user.userId directly
async function getUserQuizResults(req, res) {
  const userId = req.user.userId;

  try {
    const results = await QuizResult.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(results);
  } catch (err) {
    console.error("Fetch Results Error:", err);
    return res.status(500).json({ error: "Failed to fetch results" });
  }
}

module.exports = {
  handleQuizResult,
  getUserQuizResults,
};
