import React from 'react'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import '../../App.css'
import toast, { Toaster } from 'react-hot-toast';


function Home() {
  return (
    <div className='home-container-1'>
      <div><Toaster/></div>
      <LeftSideBar/>
      <div className="home-container-2"></div>
      <HomeMainbar/>
      <RightSidebar/>
    </div>
  )
}

export default Home
