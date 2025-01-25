import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({usage}) => {

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href='/';
    };

    if(usage === "Player") {
        return (
            <nav className="navbar">
                <button onClick={handleLogout} className="navbar-btn">خروج</button>
                <div className="right-section">
                    <div className="nav-links">
                        <Link to="/Followings">دنبال شوندگان</Link>
                        <Link to="/QuestionBox">مدیریت سوالات</Link>
                        <Link to="/ScoreTable">جدول امتیازات</Link>
                        <Link to="/PlayerMainPage">صفحه اصلی</Link>
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
                <button onClick={handleLogout} className="navbar-btn">خروج</button>
                <div className="right-section">
                    <div className="nav-links">
                        <Link to="/TarrahQuestionManagement">مدیریت سوالات</Link>
                        <Link to="/TarrahCategoryManagement">مدیریت دسته بندی ها</Link>
                        <Link to="/TarrahMainPage">صفحه اصلی</Link>
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
