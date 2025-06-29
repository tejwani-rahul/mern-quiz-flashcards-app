const express = require("express");
const {handleAddingFlashCards,handleFlashCardsCard} = require("../collection/flashCards")
const authMiddleware = require("../middleware/authMiddleware");



const router = express.Router();

router.post("/add",authMiddleware,handleAddingFlashCards)

router.get('/flashcards/:topicName', handleFlashCardsCard);

module.exports = router;