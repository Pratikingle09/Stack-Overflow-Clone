import React from "react";
import "./Navbar.css";
import {useSelector,useDispatch} from 'react-redux'
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../Avatar/Avatar";
import { Link, Navigate ,useNavigate} from "react-router-dom";
import { useEffect } from "react";
import {setCurrentUser} from '../../action/currentUser'

function Navbar() {
  const dispatch = useDispatch()
  var User = useSelector((state)=>(state.currentUserReducer))
  useEffect(()=>{
    const token = User?.token
    if(token)
    {
      const decodedToken = jwtDecode(token)          
      if(decodedToken.exp * 1000 < new Date().getTime()){     // we are going to calculate the time of expired token and logout the user
        handleLogout()
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  },[dispatch])

 const navigate = useNavigate();
  const handleLogout=()=>{
    dispatch({type:'LOGOUT'});
    navigate('/')
    dispatch(setCurrentUser(null))
  }
  return (
    <div>
      <nav className="main-nav">
        <div className="navbar">
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/" className="nav-item nav-btn">
            About
          </Link>
          <Link to="/" className="nav-item nav-btn">
            Products
          </Link>
          <Link to="/" className="nav-item nav-btn">
            For Teams
          </Link>
          <form>
            <input type="text" placeholder="Search..." />
            <img
              src={search}
              alt="search-icon"
              width="18"
              className="search-icon"
            />
          </form>
          {User === null ? (
            <Link to="/Auth" className="nav-item nav-links">
              LogIn
            </Link>
          ) : (
            <>
              
                <Avatar backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"><Link to={`/Users/${User?.result?._id}`} style={{color:"white",textDecoration:"none"}}> {User?.result?.name?.charAt(0).toUpperCase()} </Link></Avatar>
             
              <button className="nav-item nav-links" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
