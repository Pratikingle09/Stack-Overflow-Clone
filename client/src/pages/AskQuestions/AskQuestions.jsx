import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import "./AskQuestions.css";
import {useDispatch , useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {askQuestion} from "../../action/question";

function AskQuestions() {
  const [questionTitle, setQuestionTitle] = useState(null);
  const [questionBody, setQuestionBody] = useState(null);
  const [questionTags, setQuestionTags] = useState(null);

  const dispatch = useDispatch();
  const User = useSelector((state)=>(state.currentUserReducer))
  const naviget = useNavigate()

  const HandleKey = (e)=>{
    if(e.key === 'Enter')
    {
      setQuestionBody(questionBody + "\n")
    }
  }

  const HandleOnSubmit = (e)=>{
    e.preventDefault();
    if(questionBody=='')
    {
      toast.error("Please Enter Question Body")
    }
    if(questionTags=='')
    {
      toast.error("Please Enter Question Tags")
    }
    if(questionTitle=='')
    {
      alert("Please Enter Question Title")
    }
    dispatch(askQuestion({questionBody,questionTags,questionTitle,userPosted:User.result.name,userId:User?.result?._id},naviget))
  }
  return (
    <div className="ask-question">
      <div><Toaster/></div>
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={HandleOnSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you're asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                placeholder="e.g is there an R function for finding the index of an element in a vector?"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                cols="30"
                rows="10"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
               onKeyPress={HandleKey}></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                placeholder="e.g. (xml typescript wordpress)"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
              required/>
            </label>
          </div>
          <input
            type="submit"
            value="Review your question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
}

export default AskQuestions;
