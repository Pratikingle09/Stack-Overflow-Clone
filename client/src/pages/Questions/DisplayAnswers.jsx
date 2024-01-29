import React from "react";
import moment from "moment";
import {useSelector,useDispatch} from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import "./Questions.css";
import {deleteAnswer} from '../../action/question'

function DisplayAnswers({ question, HandleShare }) {
  const User = useSelector((state)=>(state.currentUserReducer))
  const { id } = useParams()
  const dispatch = useDispatch();
  
  const HandleDelete = (answerId,noOfAnswers)=>{
    const No = noOfAnswers-1;
    dispatch(deleteAnswer(id,answerId, No ))
    toast.success('"Successfully Deleted"', {
      style: {
        border: '1px solid green',
        padding: '16px',
        color: 'green',
      },
      iconTheme: {
        primary: 'green',
        secondary: 'white',
      },
    });
  }
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{ans.answerBody}</p>
          <div className="question-actions-user">
            <div>
              <button onClick={HandleShare}>Share</button>
              {User?.result?._id === ans?.userId && (
                <button onClick={()=>HandleDelete(ans._id,question.noOfAnswers)}>Delete</button>
              )}
            </div>
            <div>
              <p>Answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`Users/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                <Avatar backgroundColor="green" px="8px" py="5px">
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayAnswers;
