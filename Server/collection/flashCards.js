const FlashCards = require("../models/flashCards")


// We Can Add FlashCards to the database Using PostMan or any other API testing tool Using handleAddingFlashCards Function .
// async function handleAddingFlashCards(req,res) {
//     const {topic ,cards} =req.body;
    
//     try{
//     const existingFlashCard = await FlashCards.findOne({topic});
//     if(existingFlashCard){
//         existingFlashCard.cards.push(...cards)
//         await existingFlashCard.save();

//         return res.status(200).json({message :"the FlashCard added successfully to",topic})
//     }else{
//     await FlashCards.create({
//         topic,
//         cards,
//     })
//     return res.status(201).json({message:"entry added Successfully"})
//     }

// }catch(err){
//     console.error("Error creating FlashCards:", err.message);
//     res.status(500).json({ error: "Server error while creating quiz" });
// }
// }

async function handleFlashCardsCard(req,res) {
    const { topicName } = req.params;
        const flashCards = await FlashCards.findOne({ topic: topicName }).select('cards');
            if (flashCards){
                 return res.status(200).json(flashCards.cards);}
            else{
                res.status(404).json({ error: 'Topic not found' });}
    
}

module.exports ={
    //handleAddingFlashCards,
    handleFlashCardsCard
}