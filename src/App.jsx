import {  useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './pages/Header'
import { Route, Routes } from 'react-router-dom'
import Add_user from './pages/Add_user'
import Home from './pages/Home'
import Children from './pages/Children'
import Parents from './pages/Parents'

function App() {
  return (
    <div className="mx-4 sm:mx-[10%] pt-20"> 
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/children_info' element={<Children />} />
        <Route path='/parents_info' element={<Parents />} />
        <Route path='/add_info' element={<Add_user />} />
        <Route path="/edit-parent/:id" element={<Add_user />} /> 
      </Routes>
    </div>
  )
}


export default App
