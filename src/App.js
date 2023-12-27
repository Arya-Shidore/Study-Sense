import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbars from './Components/common/Navbar'
//get app.css
import './App.css'

const App = () => {
  return (
    <div className="w-screen min-h-screen bg-richblue-900 flex flex-col flex-inter">
    <Navbars />
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
