const Quiz = require("../models/quiz");
const FlashCards = require("../models/flashCards");

// This module handles fetching quiz topics for selection.
async function handelSelectingQuiz(req, res) {
  try {
    const quizTopics = await Quiz.find({}, 'topic');
    const flashCardTopics = await FlashCards.find({}, 'topic');

    const allTopics = [
      ...quizTopics.map(q => q.topic),
      ...flashCardTopics.map(fc => fc.topic)
    ];

    // Remove duplicates
    const uniqueTopics = [...new Set(allTopics)];

    res.json(uniqueTopics);
  } catch (err) {
    console.error("Error fetching all topics:", err);
    res.status(500).json({ error: "Failed to fetch topics" });
  }
}


module.exports = {
  handelSelectingQuiz,      
}