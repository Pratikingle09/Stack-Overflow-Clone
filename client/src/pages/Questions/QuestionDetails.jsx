import React from "react";
import moment from "moment";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import copy from "copy-to-clipboard";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar.jsx";
import DisplayAnswers from "./DisplayAnswers.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteQuestion, postAnswer ,voteQuestion} from "../../action/question.js";
const QuestionDetails = () => {
  const { id } = useParams();

  const questionList = useSelector((state) => state.questionsReducer);
  // const questionList = [
  //   {
  //     _id: "1",
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 2,
  //     questionTitle: "What is a function ?",
  //     questionBody: "It meant to be",
  //     questionTags: ["java", "c", "javascript"],
  //     userPosted: "mano",
  //     userId: 1,
  //     askedOn: "jan 1",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "Kumar",
  //         answeredOn: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },
  //   {
  //     _id: "2",
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 2,
  //     questionTitle: "What is a function ?",
  //     questionBody: "It meant to be",
  //     questionTags: ["java", "c", "javascript"],
  //     userPosted: "mano",
  //     userId: 1,
  //     askedOn: "jan 1",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "Kumar",
  //         answeredOn: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },
  //   {
  //     _id: "3",
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 2,
  //     questionTitle: "What is a function ?",
  //     questionBody: "It meant to be",
  //     questionTags: ["java", "c", "javascript"],
  //     userPosted: "mano",
  //     userId: 1,
  //     askedOn: "jan 1",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "Kumar",
  //         answeredOn: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },
  // ];
  const [answer, setAnswer] = useState("");
  const Navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const url = "http://localhost:5173";
  const User = useSelector((state) => state.currentUserReducer);
  const handlePostAnswer = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      toast.error("Login or Signup before Answering the Question");
      Navigate("/Auth");
    } else {
      if (answer === "") {
        toast.error("Enter an Answer before submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: answer,
            userAnswered: User.result.name,
            userId:User?.result?._id,
          })
        );
        setAnswer("");
      }
    }
  };
  const HandleShare = () => {
    copy(url + location.pathname);
    toast.success("Copied Successfully")
    // alert("Copied url:" + url + location.pathname);
    
  };

  const HandleDelete=()=>{
    dispatch(deleteQuestion(id,Navigate))
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

  const handleUpVote = ()=>{
    dispatch(voteQuestion(id,'upVote',User.result._id))
  }

  const handleDownVote = ()=>{
    dispatch(voteQuestion(id,'downVote',User.result._id))
  }
  return (
    <>
    <div><Toaster/></div>
    <div className="question-details-page">
      {questionList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt=""
                        width="18"
                        activeClassName="active"
                        onClick={handleUpVote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>   {/*as upvote and downvote are the array containing the userId 
                       who have voted to respective field we have to used length to 
                       calculate */}
                      <img
                        src={downvote}
                        alt=""
                        width="18"
                        activeClassName="active"
                        onClick={handleDownVote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button onClick={HandleShare}>Share</button>
                          {User?.result?._id === question?.userId && (
                            <button onClick={HandleDelete} >Delete</button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar backgroundColor="orange" px="8px" py="5px">
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswers
                      key={question._id}
                      question={question}
                      HandleShare={HandleShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      handlePostAnswer(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name=""
                      value={answer}
                      cols="30"
                      rows="10"
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                  <p>
                    Browse other Questions tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "nine", color: "#009dff" }}
                    >
                      {" "}
                      Ask Your Own Question.{" "}
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
    </>
  );
};

export default QuestionDetails;
