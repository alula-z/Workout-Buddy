import TopNav from './TopNav'
import SideBar from './SideBar'
import React from 'react';
import './css/layouts.css';
const Layout = ({children}: {children: React.ReactNode}) =>{
    return(
        <div className= "app-container">
            <TopNav/>
            <div className = "main-content">
                <SideBar/>
                <div className = "page-content">{children}</div>
            </div>
        </div>
    );
};

export default Layout