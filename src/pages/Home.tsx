import TopNav from "../layouts/TopNav"
import {auth }from '../firebase';
import SideBar from "../layouts/SideBar";
export default function Home() {
    const user = auth.currentUser;
    return (
        <div>
            <TopNav />
            <SideBar/>
            <h1>Home</h1>
            <h1> Welcome {user?.email}</h1>
            
        </div>
    )
}