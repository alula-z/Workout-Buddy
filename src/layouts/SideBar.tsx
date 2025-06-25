import React from "react";
import { signOut } from "firebase/auth";
import './css/sidebar.css';
import {auth} from '../firebase';
import { useNavigate } from "react-router-dom";

export default function SideBar(){
    const nav = useNavigate();
    const handleLogout = () =>{
        signOut(auth);
        nav('/Login');
    }
    return(
        <div className="sidebar">
            <a href = "/">Home</a>
            <a href = "/create">Create</a>
            <a href = "/stats">Stats</a>
            <a href = "/profile">Profile</a>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

