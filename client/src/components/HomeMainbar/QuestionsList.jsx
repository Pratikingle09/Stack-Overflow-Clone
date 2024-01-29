import React from 'react'
import Questions from './Questions'

function QuestionsList({questionlist}) {
  return (
    <>
     {
        questionlist.map((question)=>(
            <Questions question={question} key={question._id} />
        ))
     } 
    </>
  )
}

export default QuestionsList
