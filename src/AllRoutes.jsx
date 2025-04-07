import React,{useEffect, useState} from 'react'
import {Routes,Route} from "react-router-dom"


const Visualize=React.lazy(() => import('./Visualize'));
const ProtectedRoute=React.lazy(() => import('./ProtectedRoute'));
const Signup=React.lazy(()=>import('./Signup'))
const Login=React.lazy(()=> import('./Login'))
const Quizgen=React.lazy(()=>import('./Quizgen'))
const App=React.lazy(()=>import('./App'))
export const Quiz=React.createContext();
function AllRoutes() {
    const[topic,setTopic]=useState('java')
      const[noofques,setNoOfQues]=useState(20)
      const[ques,setQues]=useState([])
      const[isError,setIsError]=useState(false)
      const[loading,setLoading]=useState(false)
      const[type,setType]=useState("easy")
      const[password,setPassword]=useState(localStorage.getItem("userdata")!=null?JSON.parse(localStorage.getItem("userdata")).password:'')
      const[mail,setMail]=useState(localStorage.getItem("userdata")!=null?JSON.parse(localStorage.getItem("userdata")).mail:'')
     
  return (
    <div>
        <Quiz.Provider value={{topic,setTopic,noofques,setNoOfQues,ques,setQues,isError,setIsError,loading,setLoading,type,setType,password,setPassword,mail,setMail}}>
      <Routes>
        <Route path="" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="sel" element={<ProtectedRoute><App/></ProtectedRoute>}/>
        <Route path="quiz" element={<ProtectedRoute><Quizgen/></ProtectedRoute>}/>
         <Route path="stat" element={<ProtectedRoute><Visualize/></ProtectedRoute>}/>
      </Routes>
      </Quiz.Provider>
    </div>
  )
}

export default AllRoutes
