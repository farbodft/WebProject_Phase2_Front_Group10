import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onSubmit, error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, password });
    };

    return (
        <div className="form-box">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username-login">نام کاربری:</label>
                <input
                    type="text"
                    id="username-login"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password-login">گذرواژه:</label>
                <input
                    type="password"
                    id="password-login"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
                <button type="submit">ورود</button>
            </form>
        </div>
    );
};

export default LoginForm;
