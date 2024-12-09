import React from 'react';
import './RegisterForm.css';

const RegisterForm = ({ onSubmit }) => {
    return (
        <div className="form-box">
            <form onSubmit={onSubmit}>
                <label htmlFor="email-register">ایمیل:</label>
                <input type="text" id="email-register" name="email-register" />
                <label htmlFor="username-register">نام کاربری:</label>
                <input type="text" id="username-register" name="username-register" />
                <label htmlFor="password-register">گذرواژه:</label>
                <input type="password" id="password-register" name="password-register" />
                <label htmlFor="confirm-password">تکرار گذرواژه:</label>
                <input type="password" id="confirm-password" name="confirm-password" />
                <label htmlFor="gender">جنسیت:</label>
                <select className="genderSelect" title="جنسیت">
                    <option value="" disabled selected>انتخاب کنید</option>
                    <option>مرد</option>
                    <option>زن</option>
                </select>
                <button type="submit">ثبت نام</button>
            </form>
        </div>
    );
};

export default RegisterForm;
