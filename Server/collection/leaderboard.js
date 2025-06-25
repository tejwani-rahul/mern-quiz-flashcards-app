const QuizResult = require("../models/report")
const User = require('../models/user');


async function getLeaderboard(req,res) {
  try {
    const leaderboard = await QuizResult.aggregate([
      // Sort first by score descending
      { $sort: { score: -1 } },
      // Group by user and topic to get highest score per user per topic
      {
        $group: {
          _id: { userId: '$userId', topic: '$topic' },
          highestScore: { $first: '$score' },
          total: { $first: '$total' }
        }
      },
      // Join user info
      {
        $lookup: {
          from: 'users', // this must match your actual collection name in MongoDB
          localField: '_id.userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          topic: '$_id.topic',
          username: '$user.name',
          score: '$highestScore',
          total: '$total'
        }
      },
      // Optional: sort again by topic then score
      { $sort: { topic: 1, score: -1 } }
    ]);

    res.json(leaderboard);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
  
}

module.exports={
    getLeaderboard,
}