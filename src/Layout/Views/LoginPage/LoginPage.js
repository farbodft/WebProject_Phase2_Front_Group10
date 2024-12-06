import React from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import RegisterForm from '../../Components/RegisterForm/RegisterForm';
import Footer from '../../Components/Footer/Footer';

const LoginPage = () => {
    return (
        <div>
            <img src="/photo/logo.png" alt="Logo" className="logo" />
            <div className="container">
                <LoginForm />
                <RegisterForm />
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
