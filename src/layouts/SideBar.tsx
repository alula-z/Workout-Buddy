import React from "react";
import './sidebar.css';
export default function SideBar(){
    const handleLogout = () =>{

    }
    return(
        <div className="sidebar">
            <a href = "/">Home</a>
            <a href = "/create">Create</a>
            <a href = "/stats">Stats</a>
            <a href = "/profile">Profile</a>
            <button onClick={handleLogout} title="Log Out">Log Out</button>
        </div>
    )
}

