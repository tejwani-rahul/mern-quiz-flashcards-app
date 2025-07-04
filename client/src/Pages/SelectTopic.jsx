import axiosInstance from '../api/axiosInstance';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';



export const SelectTopic = () => {
    
    const navigate = useNavigate();
    const [quizTopics, setQuizTopics] = useState([])
    const [name,setName] = useState("")

    
    useEffect(()=>{

        const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setName(decoded.name); 
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }

              const fetchingQuizTopics =async ()=>{
            try{
            const response = await axiosInstance.get('/topics/topics');
            setQuizTopics(response.data)
            
        }catch(err){
            console.error("error fetching the Quiz Topics",err)
        }

    }

    fetchingQuizTopics();
},[]);

    const handelTopicClick=(topic)=>{
        
        navigate(`/topics/${topic}`)
}
  return (
   <div className="select-topic-container">
    
  <h2>Hi {name}, welcome to Quiz App!</h2>
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