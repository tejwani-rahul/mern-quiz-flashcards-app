const express =require("express")
const router = express.Router()
const {getLeaderboard} =require("../collection/leaderboard")


router.get('/leaderboard',getLeaderboard )


module.exports=router