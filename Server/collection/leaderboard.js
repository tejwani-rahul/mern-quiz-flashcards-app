const QuizResult = require("../models/report");
const User = require('../models/user');

async function getLeaderboard(req, res) {
  try {
    const leaderboard = await QuizResult.aggregate([
      { $sort: { score: -1 } },
      {
        $group: {
          _id: { userId: '$userId', topic: '$topic' },
          highestScore: { $first: '$score' },
          total: { $first: '$total' }
        }
      },
      {
        $lookup: {
          from: 'users',
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
      { $sort: { topic: 1, score: -1 } }
    ]);

    res.json(leaderboard);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getLeaderboard };
