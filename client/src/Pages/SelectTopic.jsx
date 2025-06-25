import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



export const SelectTopic = () => {
    
    const navigate = useNavigate();
    const [quizTopics, setQuizTopics] = useState([])

    
    useEffect(()=>{
              const fetchingQuizTopics =async ()=>{
            try{
            const response = await axios.get('http://localhost:5000/quiz/topics');
            setQuizTopics(response.data)
            console.log("Fetched topics:", response.data);

        }catch(err){
            console.error("error fetching the Quiz Topics",err)
        }

    }

    fetchingQuizTopics();
},[]);

    const handelTopicClick=(topic)=>{
        
        navigate(`/topics/${topic}`)

            console.log("onclick: ",topic)
    }
  return (
   <div className="select-topic-container">
  <h2>Select Topic</h2>
  {quizTopics.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <div className="topic-grid">
      {quizTopics.map((topic, index) => (
        <div
          key={index}
          onClick={() => handelTopicClick(topic)}
          className="topic-box"
        >
          {topic}
        </div>
      ))}
    </div>
  )}
</div>

  )
}
export default SelectTopic;