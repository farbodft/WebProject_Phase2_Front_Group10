import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = ({ onSubmit, error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, password, email, gender });
    };

    return (
        <div className="form-box">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email-register">ایمیل:</label>
                <input
                    type="text"
                    id="email-register"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="username-register">نام کاربری:</label>
                <input
                    type="text"
                    id="username-register"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password-register">گذرواژه:</label>
                <input
                    type="password"
                    id="password-register"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirm-password">تکرار گذرواژه:</label>
                <input
                    type="password"
                    id="confirm-password"
                    name="confirmPassword"
                    required
                />
                <label htmlFor="gender">جنسیت:</label>
                <select
                    className="genderSelect"
                    title="جنسیت"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                >
                    <option value="" disabled>انتخاب کنید</option>
                    <option value="Male">مرد</option>
                    <option value="Female">زن</option>
                </select>
                {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
                <button type="submit">ثبت نام</button>
            </form>
        </div>
    );
};

export default RegisterForm;
