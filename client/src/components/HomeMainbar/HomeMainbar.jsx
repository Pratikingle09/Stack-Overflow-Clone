import React from "react";
import "./HomeMainbar.css";
import { Link, useLocation,useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import QuestionsList from "./QuestionsList";
import {useSelector} from 'react-redux'

function HomeMainbar() {
  const location = useLocation(); // get the current path or url

  const questionList = useSelector(state => state.questionsReducer)
  // const questionList = [
  //   {
  //     _id:1,
  //     upVotes:3,
  //     downVotes:2,
  //     noOfAnswers:2,
  //     questionTitle:"What is a function ?",
  //     questionBody:"It meant to be",
  //     questionTags:["java","c","javascript"],
  //     userPosted:"mano",
  //     userId:1,
  //     askedOn:"jan 1",
  //     answer:[{
  //       answerBody:"Answer",
  //       userAnswered:"Kumar",
  //       answeredOn:"jan 2",
  //       userId:2,
  //     }]
  //   },
  //   {
  //     _id:2,
  //     upVotes:3,
  //     downVotes:2,
  //     noOfAnswers:2,
  //     questionTitle:"What is a function ?",
  //     questionBody:"It meant to be",
  //     questionTags:["java","c","javascript"],
  //     userPosted:"mano",
  //     userId:1,
  //     askedOn:"jan 1",
  //     answer:[{
  //       answerBody:"Answer",
  //       userAnswered:"Kumar",
  //       answeredOn:"jan 2",
  //       userId:2,
  //     }]
  //   },
  //   {
  //     _id:3,
  //     upVotes:3,
  //     downVotes:2,
  //     noOfAnswers:2,
  //     questionTitle:"What is a function ?",
  //     questionBody:"It meant to be",
  //     questionTags:["java","c","javascript"],
  //     userPosted:"mano",
  //     userId:1,
  //     askedOn:"jan 1",
  //     answer:[{
  //       answerBody:"Answer",
  //       userAnswered:"Kumar",
  //       answeredOn:"jan 2",
  //       userId:2,
  //     }]
  //   },

  // ];
  const user = 1
  const navigate = useNavigate()
  const redirect = ()=>{
    toast.error("login or signup to ask a question")
      // alert("login or signup to ask a question")
      navigate("/Auth")
  }
  const validate = ()=>{
    if(user===null)
    {
      redirect()
    }
    else{
      navigate('/AskQuestions')
    }
  }

  return (
    <div className="main-bar">
      <div><Toaster/></div>
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={validate} className="ask-btn">
          Ask Questions
        </button>
      </div>
      <div>
        {questionList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionList.data.length} Questions</p>
            <QuestionsList  questionlist={questionList.data} key={questionList.data._id}/>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeMainbar;
