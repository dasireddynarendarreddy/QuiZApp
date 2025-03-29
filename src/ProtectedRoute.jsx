import React,{useContext} from 'react'
import { Quiz } from './AllRoutes'
import { Navigate } from 'react-router-dom'
function ProtectedRoute({children}) {
  const {password,mail}=useContext(Quiz)
     if(localStorage.getItem("userdata")!==null)
     {
        if(JSON.parse(localStorage.getItem("userdata")).password===password&&JSON.parse(localStorage.getItem("userdata")).mail===mail)
        return children
     }
        

     return <Navigate to="/" replace/>
}

export default ProtectedRoute
