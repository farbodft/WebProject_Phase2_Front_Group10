import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Choice.css';

const Choice = () => {
    const navigate = useNavigate(); 

    return (
        <div>
            <div className="logo-container">
                <img src="/photo/logo.png" alt="Logo" className="logo" />
            </div>
            <div className="header">!نقش خودت رو انتخاب کن</div>
            <div className="button-container">
                <button onClick={() => navigate('/login')} className="button">طراح</button>
                <button onClick={() => navigate('/login')} className="button secondary">بازیکن</button>
            </div>
        </div>
    );
}

export default Choice;
