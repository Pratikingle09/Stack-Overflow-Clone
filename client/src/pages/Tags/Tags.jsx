import React from 'react'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import TagList from './TagList'
import { tagsList } from './tagsList'
import './Tags.css'

function Tags() {
  
  return (
    <div className="tags-set">
    <div className='home-container-1'>
        <LeftSideBar/>
        <div className="home-container-3">
            <h1 className='tags-h1'>Tags</h1>
            <p className='tags-p'>A tag is a keyword or lable thet categorizes your Question with other, similar Question. </p>
            <p className='tags-p'>Using the right tags make it easier for others to find and answer your Question.</p>
            <div className="tags-list-container">
                {
                    tagsList.map((tag)=>(
                        <TagList tag={tag} key={tag.id}/>
                    ))
                }
            </div>
        </div>
    </div>
    </div>
  )
}

export default Tags
