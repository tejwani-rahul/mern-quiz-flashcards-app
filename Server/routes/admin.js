const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const {
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
 
} = require('../collection/admin');


// User management
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

// Result Managment
router.get('/results', authMiddleware, adminMiddleware, getAllQuizResults);

// Quizzes management
router.post('/quiz/:topic', authMiddleware, adminMiddleware, createOrUpdateQuiz);
router.get('/quiz/:topic', authMiddleware, adminMiddleware, getQuizByTopic);

// Flashcards management
router.get('/flashcards/:topic', authMiddleware, adminMiddleware, getFlashcardsByTopic);
router.post('/flashcards/:topic', authMiddleware, adminMiddleware, createOrUpdateFlashcards);

// Topics management
router.get('/topics', authMiddleware, adminMiddleware, getAllTopics)
router.delete('/topic/:topic', authMiddleware, adminMiddleware, deleteTopic);

// Delete a quiz result by ID
router.delete('/results/:id', authMiddleware,adminMiddleware, deleteQuizResult);

module.exports = router;