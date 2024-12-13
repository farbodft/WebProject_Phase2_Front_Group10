import React, { useEffect, useState } from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import RegisterForm from '../../Components/RegisterForm/RegisterForm';
import Footer from '../../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(sessionStorage.getItem("role")); // دریافت نقش از sessionStorage
    const [loginError, setLoginError] = useState(''); // وضعیت جدید برای پیام‌های خطای لاگین
    const [registerError, setRegisterError] = useState(''); // وضعیت جدید برای پیام‌های خطای ثبت‌نام

    useEffect(() => {
        // اگر نقش در sessionStorage موجود نباشد، هدایت به صفحه انتخاب نقش
        if (!role) {
            navigate('/');
        }
    }, [role, navigate]);

    const handleLoginSubmit = ({ username, password }) => {
        fetch('http://localhost:5004/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role, username, password })
        })
        .then(response => {
            if (response.ok) {
                response.text().then(data => {
                    setLoginError(''); // پاک کردن پیام خطا در صورت موفقیت
                    if (role === 'designer') {
                        navigate('/TarrahMainPage');
                    } else if (role === 'player') {
                        navigate('/PlayerMainPage');
                    }
                });
            } else {
                response.text().then(data => setLoginError(data));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setLoginError('An error occurred. Please try again later.');
        });
    };

    const handleRegisterSubmit = ({ username, password, email, gender }) => {
        fetch('http://localhost:5004/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role, username, password, email, gender })
        })
        .then(response => {
            if (response.ok) {
                response.text().then(data => {
                    setRegisterError(''); // پاک کردن پیام خطا در صورت موفقیت
                    if (role === 'designer') {
                        navigate('/TarrahMainPage');
                    } else if (role === 'player') {
                        navigate('/PlayerMainPage');
                    }
                });
            } else {
                response.text().then(data => setRegisterError(data));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setRegisterError('An error occurred. Please try again later.');
        });
    };

    return (
        <div>
            <div className="container" style={{ display: "flex", flexDirection: "column" }}>
                <LoginForm onSubmit={handleLoginSubmit} error={loginError} />
                <RegisterForm onSubmit={handleRegisterSubmit} error={registerError} />
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
