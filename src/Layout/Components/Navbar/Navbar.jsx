import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <button onClick={() => window.location.href='/'} className="navbar-btn">خروج</button>
            <div className="right-section">
                <div className="nav-links">
                    <Link to="/QuestionBox">مدیریت سوالات</Link>
                    <Link to="/ScoreTable">جدول امتیازات</Link>
                    <Link to="/">صفحه اصلی</Link>
                </div>
                <div className="logo">
                    <img src="/photo/logo.png" alt="Logo" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
