import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'
import Questions from './pages/Questions/Questions'
import AskQuestions from './pages/AskQuestions/AskQuestions'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from "./pages/Tags/Tags";
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'

function Mroutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Auth' element={<Auth/>}/>
        <Route path='/Questions' element={<Questions/>}/>
        <Route path='/AskQuestions' element={<AskQuestions/>}/>
        <Route path='/Questions/:id' element={<DisplayQuestion/>}/>
        <Route path='/Tags' element={<Tags/>}/>
        <Route path='/Users' element={<Users/>}/>
        <Route path='/Questions/:id/Users/:id' element={<UserProfile/>}/>
      </Routes>
    </div>
  )
}

export default Mroutes
