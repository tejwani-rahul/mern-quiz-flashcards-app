const express = require("express");
const {handelAddQuiz,handelSelectingQuiz,handleQuizQuestions} =require("../collection/quiz")
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/quiz-post",authMiddleware, handelAddQuiz)

router.get("/topics", handelSelectingQuiz)

router.get('/questions/:topicName',handleQuizQuestions)





module.exports = router;