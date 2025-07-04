const User = require("../models/user");
const Quiz = require('../models/quiz');
const FlashCards = require('../models/flashCards');
const QuizResult = require('../models/report');


// Get all users 
 async function getAllUsers(req, res) {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error("Fetch Users Error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}


// Delete a user and their quiz results
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    await QuizResult.deleteMany({ userId: id });

    res.json({ message: "User and their quiz results deleted" });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ error: "Failed to delete user and quiz results" });
  }
}


// Get all quiz results
async function getAllQuizResults(req, res) {
  try {
    const results = await QuizResult.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error("Fetch Results Error:", err);
    res.status(500).json({ error: "Failed to fetch results" });
  }
}    

// GET quiz by topic
async function getQuizByTopic(req, res) {
  const { topic } = req.params;

  try {
    const quiz = await Quiz.findOne({ topic });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz topic does not exist' });
    }
    res.json(quiz);
  } catch (err) {
    console.error('Get Quiz Error:', err);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
}


//  POST create or update quiz by topic
// POST create or update quiz by topic
async function createOrUpdateQuiz(req, res) {
  const originalTopic = req.params.topic;
  const { questions, duration, topic: newTopic } = req.body;

  if (!Array.isArray(questions)) {
    return res.status(400).json({ error: 'Questions must be an array' });
  }

  try {
    let quiz = await Quiz.findOne({ topic: originalTopic });

    if (!quiz) {
      quiz = new Quiz({
        topic: newTopic || originalTopic,
        duration: duration || 60,
        questions
      });
      await quiz.save();
    } else {
      quiz.questions = questions;
      quiz.duration = duration || quiz.duration;

      if (newTopic && newTopic !== originalTopic) {
        quiz.topic = newTopic;

        // Rename topic in flashcards too
        await FlashCards.findOneAndUpdate(
          { topic: originalTopic },
          { topic: newTopic }
        );

        // Rename topic in quiz results too
        await QuizResult.updateMany(
          { topic: originalTopic },
          { topic: newTopic }
        );
      }

      await quiz.save();
    }

    return res.json({ message: 'Quiz created or updated', quiz });
  } catch (err) {
    console.error('Create/Update Quiz Error:', err);
    res.status(500).json({ error: 'Failed to create/update quiz' });
  }
}

// GET flashcards by topic
async function getFlashcardsByTopic(req, res) {
  const { topic } = req.params;

  try {
    const flashcards = await FlashCards.findOne({ topic });
    if (!flashcards) {
      return res.status(404).json({ message: 'Flashcards topic does not exist' });
    }
    res.json(flashcards);
  } catch (err) {
    console.error('Get Flashcards Error:', err);
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
}

// POST create or update flashcards by topic
async function createOrUpdateFlashcards(req, res) {
  const originalTopic = req.params.topic;
  const { cards, topic: newTopic } = req.body;

  if (!Array.isArray(cards)) {
    return res.status(400).json({ error: 'Cards must be an array' });
  }

  try {
    let flashcards = await FlashCards.findOne({ topic: originalTopic });

    if (!flashcards) {
      flashcards = new FlashCards({ topic: newTopic || originalTopic, cards });
      await flashcards.save();
    } else {
      flashcards.cards = cards;

      if (newTopic && newTopic !== originalTopic) {
        flashcards.topic = newTopic;

        // Rename topic in quizzes too
        await Quiz.findOneAndUpdate(
          { topic: originalTopic },
          { topic: newTopic }
        );

        // Rename topic in quiz results too
        await QuizResult.updateMany(
          { topic: originalTopic },
          { topic: newTopic }
        );
      }

      await flashcards.save();
    }

    return res.json({ message: 'Flashcards created or updated', flashcards });
  } catch (err) {
    console.error('Create/Update Flashcards Error:', err);
    res.status(500).json({ error: 'Failed to create/update flashcards' });
  }
}



// GET all topics from both Quiz and FlashCards collections
async function getAllTopics(req, res) {
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


// delete topic from Quiz, FlashCards, and QuizResult (reports)
async function deleteTopic(req, res) {
  const { topic } = req.params;

  try {
    // Delete from Quiz collection
    const quizDelete = await Quiz.deleteOne({ topic });

    // Delete from FlashCards collection
    const flashDelete = await FlashCards.deleteOne({ topic });

    // Delete related quiz results from QuizResult (reports)
    const resultDelete = await QuizResult.deleteMany({ topic });

    res.json({
      message: `Deleted topic '${topic}' from:
        - Quiz (${quizDelete.deletedCount})
        - FlashCards (${flashDelete.deletedCount})
        - Quiz Results (${resultDelete.deletedCount})`
    });
  } catch (err) {
    console.error("Delete Topic Error:", err);
    res.status(500).json({ error: "Failed to delete topic from collections" });
  }
}

// Delete a single quiz result by ID
async function deleteQuizResult(req, res) {
  const { id } = req.params;

  try {
    const deleted = await QuizResult.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Result not found' });
    }

    res.json({ message: 'Quiz result deleted' });
  } catch (err) {
    console.error('Delete QuizResult Error:', err);
    res.status(500).json({ error: 'Failed to delete quiz result' });
  }
}

module.exports = {
  getAllUsers,
  deleteUser,
  getAllQuizResults,
  createOrUpdateQuiz,
  getQuizByTopic,
  getFlashcardsByTopic,
  createOrUpdateFlashcards,
  deleteTopic,
  getAllTopics,
  deleteQuizResult,
};
