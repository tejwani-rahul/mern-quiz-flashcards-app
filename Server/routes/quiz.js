const express = require("express");
const {handelAddQuiz,handelSelectingQuiz,handleQuizQuestions} =require("../collection/quiz")


const router = express.Router();

router.post("/quiz-post", handelAddQuiz)

router.get("/topics", handelSelectingQuiz)

router.get('/questions/:topicName',handleQuizQuestions)





module.exports = router;