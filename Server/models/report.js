const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    reviewItems: [
      {
        question: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: true,
          validate: [arrayLimit, 'Each question must have exactly 4 options'],
        },
        selected: {
          type: String,
          // required: true,  //not required to allow for unattempted questions
        },
        correct: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Validator: ensure each options array has exactly 4 choices
function arrayLimit(val) {
  return val.length === 4;
}

const QuizResult = mongoose.model('QuizResult', quizResultSchema);
module.exports = QuizResult;