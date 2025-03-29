import * as React from "react"
import { useState,useContext } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GoogleGenAI } from "@google/genai"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ShowDailog from "./ShowDailog"
import { Quiz } from "./AllRoutes"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
export default function App() {
  
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_URL });
  let prompt;
   const {topic,setTopic,noofques,setNoOfQues,ques,setQues,isError,setIsError,loading,setLoading,type,setType,mail}=useContext(Quiz);
  
  const navigate=useNavigate()
  console.log(type,noofques,topic)
  async function main() {
    if(topic.trim().length>0&&noofques)
      {
        setLoading(true)
      prompt=`generate a quiz on the ${topic}. Provide an array of objects in JSON format, with each object containing:
- A "question" key with the quiz question.
- An "options" key with an array of possible answers.
- A "correctAnswer" key with the correct answer.
- the level of questions is ${type}

Ensure the output contains exactly ${noofques} questions and provide only the JSON data, without assigning it to any variable like const reactQuiz =.`
      }
      else{
        console.log("error")
        setIsError(true)
    
      }
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
   
   
    if (response.text) {
      try {
        // Clean the response to remove code block markers
        let cleanedData = response.text
          .replace(/```json/g, "") // Remove opening ```json
          .replace(/```/g, "")     // Remove closing ```
          .trim();                 // Remove any extra whitespace
    
        // Parse the cleaned JSON
        const data = JSON.parse(cleanedData);
    
        // Check if data is an array
        if (Array.isArray(data)) {
          setQues(data); // Correctly set the questions
          navigate("/quiz");
          
          
          setLoading(false);
          
        } else {
         
          setIsError(true);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setIsError(true);
      }
    }
    
    
  }
  return (
    <div className="flex h-screen items-center justify-center">
      
    <Card className="w-[350px] p-6 shadow-lg">
      <div>Welcome {mail}</div>
      <ShowDailog isError={isError} setIsError={setIsError}/>
      <CardHeader>
        <CardTitle>Online Quiz</CardTitle>
        <CardDescription>
          Select The Topic and No. of Questions and level of quiz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="topic">Subject</Label>
              <Select onValueChange={(value) => setTopic(value)}>
                <SelectTrigger id="topic">
                  <SelectValue placeholder="java"/>
                </SelectTrigger>
                <SelectContent position="popper" value={topic}>
                  <SelectItem value="react">React Js</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="c#">C#</SelectItem>
                  <SelectItem value="c++">C++</SelectItem>
                  <SelectItem value="javascript">Javascript</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
            <Label htmlFor="noofques">level of quiz</Label>
            <Select onValueChange={(value) => setType(value)}>
                <SelectTrigger id="typeofques">
                  <SelectValue placeholder="easy" />
                </SelectTrigger>
                <SelectContent position="popper">
                <SelectItem value="easy">easy</SelectItem>
                  <SelectItem value="medium">medium</SelectItem>
                  
                  <SelectItem value="hard">Hard</SelectItem>
              
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="noofques">No. of Questions</Label>
              <Select onValueChange={(value) => setNoOfQues(value)}>
                <SelectTrigger id="noofques">
                  <SelectValue placeholder="20" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="cursor-pointer" onClick={main} disabled={loading?true:false}>
        {loading?<Loader2 className="animate-spin" /> :""}
          {loading?"loading quiz...":"Create Quiz"}
        </Button>
      </CardFooter>
    </Card>
  </div>
  )
}
