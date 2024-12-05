import React from 'react';
import './Choice.css';

const Choice = () => {
    return (
        <div>
            <div className="logo-container">
                <img src="/photo/logo.png" alt="Logo" className="logo" />
            </div>
            <div className="header">!نقش خودت رو انتخاب کن</div>
            <div className="button-container">
                <button onClick={() => window.location.href = 'LoginPage.html'} className="button">طراح</button>
                <button onClick={() => window.location.href = 'LoginPage.html'} className="button secondary">بازیکن</button>
            </div>
        </div>
    );
}

export default Choice;
