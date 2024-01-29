import React from "react";
import { useLocation } from "react-router-dom";
import "./Users.css";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import UserList from "./UserList";

function Users() {
  const location = useLocation();
  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-3" style={{marginTop:'30px'}}>
        <h1 style={{fontWeight:'400'}}>Users</h1>
        <UserList />
      </div>
    </div>
  );
}

export default Users;
