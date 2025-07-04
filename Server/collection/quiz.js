const Quiz = require("../models/quiz");

// We Can Add Quiz to the database Using PostMan or any other API testing tool Using handelAddQuiz Function.
// async function handelAddQuiz(req, res) {
// const { topic, questions } = req.body;
//     try{
// const existingQuiz = await Quiz.findOne({topic});
// if(existingQuiz){
//     existingQuiz.questions.push(...questions);
//     await existingQuiz.save();
//     return res.status(200).json({ message: "Questions added to existing quiz", quiz: topic })
// }else{

//     await Quiz.create({
//      topic,
//      questions
//     })
//     return res.status(201).json({message:"entry added Successfully"})
// }
// }catch(err){
//      console.error("Error creating quiz:", err.message);
//     res.status(500).json({ error: "Server error while creating quiz" });
// }
    

// }


// This module handles fetching quiz topics for selection.
async function handelSelectingQuiz(req,res) {
    
   try{
    const topics = await (await Quiz.find({},'topic')).map(q =>q.topic)
    res.json(topics)
   }
   catch(err){
    console.error("Error fetching The quiz Topics",err)
    res.status(500).json({error:"faild to fetch The quiz topics"})
   }
}

async function handleQuizQuestions(req,res){
    const { topicName } = req.params;
    const quiz = await Quiz.findOne({ topic: topicName }).select({questions: 1,duration: 1});
           if (quiz){
             return res.status(200).json({ questions: quiz.questions, duration: quiz.duration });
           }
        else{
            res.status(404).json({ error: 'Topic not found' });}


}


module.exports ={
    // handelAddQuiz,
    handelSelectingQuiz,
    handleQuizQuestions,
}