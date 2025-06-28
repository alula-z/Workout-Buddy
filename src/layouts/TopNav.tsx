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
            <div className = "navbar-right">
                <a href = "/profile">Profile</a>
            </div>
        </nav>
    );
};
