import React from 'react';
import './LoginForm.css';

const LoginForm = ({ onSubmit }) => {
    return (
        <div className="form-box">
            <form onSubmit={onSubmit}>
                <label htmlFor="username-login">نام کاربری:</label>
                <input type="text" id="username-login" name="username-login" />
                <label htmlFor="password-login">گذرواژه:</label>
                <input type="password" id="password-login" name="password-login" />
                <button type="submit">ورود</button>
            </form>
        </div>
    );
};

export default LoginForm;

