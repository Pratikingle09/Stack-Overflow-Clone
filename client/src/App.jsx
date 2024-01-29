import { useState , useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router} from 'react-router-dom'
import { useDispatch } from "react-redux";
import Mroutes from "./Mroutes";
import { fetchAllQuestions } from "./action/question";
import { fetchAllUsers } from "./action/users";


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  },[dispatch])

  return (
    <>
      <div className="App">
        <Router>
        <Navbar />
        <Mroutes/>
        </Router>
        
      </div>
    </>
  );
}

export default App;
