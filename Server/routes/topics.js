const express =require("express")
const router = express.Router()
const {handelSelectingQuiz} = require("../collection/topics")
const authMiddleware = require("../middleware/authMiddleware");


router.get('/topics', authMiddleware, handelSelectingQuiz);

module.exports=router