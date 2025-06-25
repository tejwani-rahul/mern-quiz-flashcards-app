const mongoose = require('mongoose');

const flashCardsSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  cards: [
    {
      front: {
        type: String,
        required: true,
      },
        back: {
        type: String,
        required: true,
      },
    },
  ],
});

const FlashCards = mongoose.model('FlashCards', flashCardsSchema);
module.exports = FlashCards