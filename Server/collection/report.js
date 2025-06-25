const QuizResult = require('../models/report');
const User = require("../models/user");

async function handleQuizResult(req, res) {
  const { userId, topic, score, total, reviewItems } = req.body;

  if (!userId || !topic || score == null || total == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await QuizResult.create({
      userId,
      topic,
      score,
      total,
      reviewItems
    });

    return res.status(201).json({ message: "Result saved", result });
  } catch (err) {
    console.error("Save Result Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getUserQuizResults(req, res) {
  const { userId } = req.params;

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
