import './css/navbar.css';
import React from 'react';
export default function TopNav() {
    return (
        <nav className = "navbar">
            <div className = "navbar-left">
                <a href = "/" className = "logo">
                    Workout Buddy
                </a>
            </div>
            <div className = "navbar-center">
                <ul className = "nav-links">
                    <li>
                        <a href = "/create">Create</a>
                    </li>
                    <li>
                        <a href = "/stats">Stats</a>
                    </li>
                </ul>
            </div>
            <div className = "navbar-right">
                <a href = "/profile">Profile</a>
            </div>
        </nav>
    );
};
