const QuizResult = require("../models/report");
const User = require("../models/user");

async function getLeaderboard(req, res) {
  const { view, topic } = req.query;

  try {
    let pipeline;

    if (view === 'global') {
      // GLOBAL: Combine all results for each user
      pipeline = [
        {
          $group: {
            _id: "$userId",
            totalScore: { $sum: "$score" },
            totalQuestions: { $sum: "$total" },
            topicCount: { $addToSet: "$topic" },
            attempts: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user"
          }
        },
        { $unwind: "$user" },
        { $match: { "user.role": { $ne: "admin" } } },
        {
          $project: {
            _id: 0,
            username: "$user.name",
            totalScore: 1,
            totalQuestions: 1,
            topicCount: { $size: "$topicCount" },
            averagePercentage: {
              $cond: [
                { $eq: ["$totalQuestions", 0] },
                0,
                { $multiply: [{ $divide: ["$totalScore", "$totalQuestions"] }, 100] }
              ]
            }
          }
        },
        { $sort: { totalScore: -1 } }
      ];

    } else {
      // BY TOPIC: Best score per user per topic
      pipeline = [
        ...(topic ? [{ $match: { topic } }] : []),
        { $sort: { score: -1 } },
        {
          $group: {
            _id: { userId: "$userId", topic: "$topic" },
            highestScore: { $first: "$score" },
            total: { $first: "$total" },
            attempts: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "_id.userId",
            foreignField: "_id",
            as: "user"
          }
        },
        { $unwind: "$user" },
        { $match: { "user.role": { $ne: "admin" } } },
        {
          $project: {
            _id: 0,
            topic: "$_id.topic",
            username: "$user.name",
            score: "$highestScore",
            total: "$total",
            attempts: "$attempts"
          }
        },
        { $sort: { topic: 1, score: -1 } }
      ];
    }

    const leaderboard = await QuizResult.aggregate(pipeline);
    res.json(leaderboard);

  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getLeaderboard };
