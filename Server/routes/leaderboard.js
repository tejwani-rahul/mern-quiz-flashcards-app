const express =require("express")
const router = express.Router()
const {getLeaderboard} =require("../collection/leaderboard")
const authMiddleware = require("../middleware/authMiddleware");


router.get('/leaderboard', authMiddleware, getLeaderboard);


module.exports=router