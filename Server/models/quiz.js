const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  duration:{
    type: Number, 
    required: true,
    default: 60, // default to 60 seconds if not provided
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String], // array of strings
        required: true,
        validate: [arrayLimit, '{PATH} must have exactly 4 options'],
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
},{timestamps:true});

// optional: validator to ensure exactly 4 options
function arrayLimit(val) {
  return val.length === 4;
  }

  const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz