import React,{useContext, useEffect, useState} from 'react'
import { GoogleGenAI } from "@google/genai";
import { Quiz } from './AllRoutes';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Toaster } from "@/components/ui/sonner"; // Custom Toaster import
import { toast } from "sonner"; 
import { Progress } from "@/components/ui/progress"
import { Button } from './components/ui/button';
import { useNavigate } from 'react-router-dom';
function Quizgen() {
 
const {ques,topic}=useContext(Quiz);
const[prog,setProgress]=useState(0)
const[quesattempt,setQuesAtm]=useState([])
const[correctans,setCorrect]=useState(0)
const navigate=useNavigate();
const saveQuiz=()=>{
  
   if(localStorage.getItem("userstats")==null)
     localStorage.setItem("userstats",JSON.stringify([{topic:"taken quiz on"+topic,date:new Date().toUTCString(),correctans:correctans,noofques:ques.length,attempted:quesattempt.length}]))
    else{
      let data = JSON.parse(localStorage.getItem("userstats"));
      console.log(data)
  
  // Ensure that data is an array
  if (!Array.isArray(data)) {
    data = [];  // In case the data is not an array, reinitialize it
  }

  data.push({
    topic: "taken quiz on " + topic,
    date: new Date().toUTCString(),
    correctans: correctans,
    noofques: ques.length,
    attempted: quesattempt.length
  });

  // Save the updated array back to localStorage
  localStorage.setItem("userstats", JSON.stringify(data));
  navigate("/stat")
    }
}
  
   const checkAnswer=(val)=>{
    

     const data=val.split("***");
     console.log(data)
     
     let quesnumber=quesattempt.includes(data[data.length-1])
     console.log(quesnumber)
      if(!quesnumber)
      {
        console.log(quesattempt)
        let len=quesattempt.push(data[data.length-1])
        console.log(len)
        let per=(len/ques.length) * 100;
        setProgress(per)
      }
      
    
  
      
     
     if(ques[(data[parseInt(data.length-1)])].correctAnswer==data[0])
     {
      setCorrect((pre)=>pre+1)
      console.log(correctans)
      
      
      toast.success("correct answer",{
        duration: 1000, // Stays until manually closed
        closeButton: true,
      })
     }
     else{
      toast.error("wrong answer",{
        duration: 1000, // Stays until manually closed
        closeButton: true,
        
      })
     }
   }

  return (
    <div>
       
 <Toaster position="top-right" richColors />

 <div className="flex flex-col items-center w-full">
      {/* Text Above the Progress Bar */}
      <div className="mb-2 text-lg font-semibold text-gray-700">Your Progress:{prog}</div>
      
      {/* Progress Bar */}
      <Progress 
        className="w-[40%] h-2 rounded-lg" 
        value={prog} 
      />
    </div>
 
{ques.length > 0 ? (
  ques.map((data, i) => (
    <div key={i}>
      <RadioGroup key={i} onValueChange={checkAnswer}>
      <h3>{i + 1}. {data.question}</h3>
      {data.options.map((op, index) => (
        
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value={`${op}***${i}`} 
              id={`option-${index}`} 
              name={`${i}`}
            />
            <Label htmlFor={`option-${index}`}>{op}</Label>
            <br/>
          </div>
        
      ))}
      </RadioGroup>
    </div>
  ))
) : (
  <p>No questions available</p>
)}
     <Button className="cursor-pointer" onClick={saveQuiz}>Submit</Button>

    </div>
  )
}

export default Quizgen
