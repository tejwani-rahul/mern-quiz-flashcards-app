const express = require("express");
const {handleAddingFlashCards,handleFlashCardsCard} = require("../collection/flashCards")

const router = express.Router();

router.post("/add",handleAddingFlashCards)

router.get('/flashcards/:topicName', handleFlashCardsCard);

module.exports = router;