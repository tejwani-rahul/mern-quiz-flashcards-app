const express = require("express");
const cors = require("cors")
const { connectMongoDb } = require("./connection/connect");
require("dotenv").config();


const userRouter = require("./routes/user");
const quizRouter = require("./routes/quiz");
const flashCardsRouter = require('./routes/flashCards')
const reportRouter = require('./routes/report')
const leaderboardRouter =require("./routes/leaderboard")


const app = express();
const PORT = 5000;

connectMongoDb(process.env.MONGO_URI).then(() =>
  console.log("MongoDB connected")
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.use("/user", userRouter);
app.use("/quiz", quizRouter);
app.use("/flashcards", flashCardsRouter);
app.use("/report", reportRouter);
app.use("/leaderboard", leaderboardRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
