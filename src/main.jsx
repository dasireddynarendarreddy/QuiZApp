import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {BrowserRouter} from "react-router-dom"
import AllRoutes from './AllRoutes'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <AllRoutes/>
 </BrowserRouter>
)
