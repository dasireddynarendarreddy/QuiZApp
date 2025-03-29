import React,{useContext, useEffect} from 'react'
import { GoogleGenAI } from "@google/genai";
import { Quiz } from './AllRoutes';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Toaster } from "@/components/ui/sonner"; // Custom Toaster import
import { toast } from "sonner"; 
function Quizgen() {
 
const {ques}=useContext(Quiz);
  
   const checkAnswer=(val)=>{
     const data=val.split("***");
     
     if(ques[(data[parseInt(data.length-1)])].correctAnswer==data[0])
     {
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
        {/*<ol>
  {ques.length > 0 ? (
    ques.map((question, index) => (
      <li key={index}>
        <h3>{index+1+")"}{question.question}</h3>
        <ul>
          {question.options.map((option, i) => (
            <li key={i}>{option}</li>
          ))}
        </ul>
      </li>
    ))
  ) : (
    <p>Loading questions...</p>
  )}
</ol>*/}
 <Toaster position="top-right" richColors />
 
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

    </div>
  )
}

export default Quizgen
