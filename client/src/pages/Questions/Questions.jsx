import React from 'react'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import '../../App.css'


function Questions() {
  return (
    <div className='home-container-1'>
      <LeftSideBar/>
      <div className="home-container-2"></div>
      <HomeMainbar/>
      <RightSidebar/>
    </div>
  )
}

export default Questions
