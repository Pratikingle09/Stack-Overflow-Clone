import React from 'react'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import QuestionDetails from './QuestionDetails';

function DisplayQuestion() {
   
  return (
    <div className='home-container-1'>
      <LeftSideBar/>
      <div className="home-container-2"></div>
      <QuestionDetails/>
      <RightSidebar/>
    </div>
  )
}

export default DisplayQuestion
