import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({usage}) => {
    if(usage === "Player") {
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
    }
    else {
        return (
            <nav className="navbar" style={{ backgroundColor: '#E27663' }}>
                <button onClick={() => window.location.href='/'} className="navbar-btn">خروج</button>
                <div className="right-section">
                    <div className="nav-links">
                        <Link to="/TarrahQuestionManagement">مدیریت سوالات</Link>
                        <Link to="/TarrahGroupManagement">مدیریت دسته بندی ها</Link>
                        <Link to="/">صفحه اصلی</Link>
                    </div>
                    <div className="logo">
                        <img src="/photo/logo.png" alt="Logo" />
                    </div>
                </div>
            </nav>
        );
    }
};

export default Navbar;
