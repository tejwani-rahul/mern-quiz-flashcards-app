const express = require("express");
const cors = require("cors")
const { connectMongoDb } = require("./connection/connect");
require("dotenv").config();


const userRouter = require("./routes/user");
const quizRouter = require("./routes/quiz");
const flashCardsRouter = require('./routes/flashCards')
const reportRouter = require('./routes/report')
const leaderboardRouter =require("./routes/leaderboard")
const adminRoutes = require("./routes/admin");
const topicsRouter = require("./routes/topics");


const app = express();

connectMongoDb(process.env.MONGO_URL).then(() =>
  console.log("MongoDB connected")
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: [ 'http://localhost:5000', `${process.env.Frontend_URL}` ],
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

app.use("/user", userRouter);
app.use("/admin", adminRoutes);
app.use("/quiz", quizRouter);
app.use("/flashcards", flashCardsRouter);
app.use("/report", reportRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("/topics", topicsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
