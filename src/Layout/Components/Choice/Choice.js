import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Choice.css';

const Choice = () => {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        sessionStorage.setItem("role", role);  // ذخیره نقش در sessionStorage
        navigate('/login');  // هدایت به صفحه لاگین
    }

    return (
        <div>
            <div className="logo-container">
                <img src="/photo/logo.png" alt="Logo" className="logo" />
            </div>
            <div className="header">!نقش خودت رو انتخاب کن</div>
            <div className="button-container">
                <button onClick={() => handleRoleSelection('tarrah')} className="button">طراح</button>
                <button onClick={() => handleRoleSelection('player')} className="button secondary">بازیکن</button>
            </div>
        </div>
    );
}

export default Choice;
