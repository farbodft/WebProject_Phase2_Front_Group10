import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionContent from '../../Components/QuestionContent/QuestionContent';
import Footer from '../../Components/Footer/Footer';

const QuestionPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <nav className="navbar">
                <button onClick={() => navigate('/')} className="navbar-btn">خروج</button>
                <div className="right-section">
                    <div className="nav-links">
                        <a href="/QuestionBox">مدیریت سوالات</a>
                        <a href="/ScoreTable">جدول امتیازات</a>
                        <a href="/MainPlayerPage">صفحه اصلی</a>
                    </div>
                    <div className="logo">
                        <img src="/photo/logo.png" alt="Logo" />
                    </div>
                </div>
            </nav>
            <QuestionContent />
            <Footer />
        </div>
    );
};

export default QuestionPage;
