import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

    const handleLoginSubmit = async ({ username, password }) => {
        try {
            const response = await axios.post('http://localhost:5004/api/auth/login', {
                role,
                username,
                password
            });

            setLoginError(''); // پاک کردن پیام خطا در صورت موفقیت
            sessionStorage.setItem("username", username); // Save username to sessionStorage

            if (role === 'tarrah') {
                navigate('/TarrahMainPage');
            } else if (role === 'player') {
                navigate('/PlayerMainPage');
            }
        } catch (error) {
            console.error('Error during login:', error.response ? error.response.data : error.message);
            setLoginError(error.response ? error.response.data : 'An error occurred. Please try again later.');
        }
    };

    const handleRegisterSubmit = async ({ username, password, email, gender }) => {
        try {
            const response = await axios.post('http://localhost:5004/api/auth/register', {
                role,
                username,
                password,
                email,
                gender
            });

            setRegisterError(''); // پاک کردن پیام خطا در صورت موفقیت
            sessionStorage.setItem("username", username); // Save username to sessionStorage

            if (role === 'tarrah') {
                navigate('/TarrahMainPage');
            } else if (role === 'player') {
                navigate('/PlayerMainPage');
            }
        } catch (error) {
            console.error('Error during registration:', error.response ? error.response.data : error.message);
            setRegisterError(error.response ? error.response.data : 'An error occurred. Please try again later.');
        }
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