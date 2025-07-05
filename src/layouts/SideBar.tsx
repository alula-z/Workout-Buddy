import { signOut } from "firebase/auth";
import './css/sidebar.css';
import {auth} from '../firebase';
import { useNavigate } from "react-router-dom";
export default function SideBar(){
    const nav = useNavigate();
    const handleLogout = () =>{
        signOut(auth)
        .then(() =>{
            nav('/');
        })
        .catch((error) => {
            console.log("Sign out error: ", error);
        })
        
    }
    return(
        <div className="sidebar">
            <a href = "/home">Home</a>
            <a href = "/create">Create</a>
            <a href = "/all-stats">All Stats</a>
            <a href = "/profile">Profile</a>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

