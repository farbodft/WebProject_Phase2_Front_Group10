import React, { useEffect, useState } from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import RegisterForm from '../../Components/RegisterForm/RegisterForm';
import Footer from '../../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(sessionStorage.getItem("role")); // دریافت نقش از sessionStorage

    // تابع برای هدایت به صفحه مناسب پس از ورود یا ثبت نام
    const handleLoginSubmit = (event) => {
        event.preventDefault();
        if (role === 'designer') {
            navigate('/TarrahMainPage');  // هدایت به صفحه طراح
        } else if (role === 'player') {
            navigate('/PlayerMainPage');  // هدایت به صفحه بازیکن
        }
    }

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        if (role === 'designer') {
            navigate('/TarrahMainPage');  // هدایت به صفحه طراح
        } else if (role === 'player') {
            navigate('/PlayerMainPage');  // هدایت به صفحه بازیکن
        }
    }

    useEffect(() => {
        // اگر نقش در sessionStorage موجود نباشد، هدایت به صفحه انتخاب نقش
        if (!role) {
            navigate('/');
        }
    }, [role, navigate]);

    return (
        <div>
            <div className="container" style={{ display: "flex", flexDirection: "column" }}>
                <LoginForm onSubmit={handleLoginSubmit} />
                <RegisterForm onSubmit={handleRegisterSubmit} />
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
