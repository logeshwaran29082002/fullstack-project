import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Otp from './pages/auth/Otp'
import Login from './pages/auth/Login'
import Home from './pages/auth/Home'



function App() {
  return (
 
 
  <>
       <Routes>
               <Route path="/" element={<Navigate to="/signup" replace />} />
                 <Route path="/signup" element={<Signup />} />
                 <Route path="/verify-otp" element={ <Otp/>}     />
                 <Route   path= "/login" element={< Login/>} />
                       <Route path="/home" element={<Home />} />
                          {/* fallback */}
            <Route path="*" element={<div>404 - Page not found</div>} />
       </Routes>
  </>
  )
}

export default App
