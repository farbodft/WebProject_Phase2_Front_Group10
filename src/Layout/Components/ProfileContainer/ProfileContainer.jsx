// src/Components/ProfileContainer.jsx
import React from 'react';
import './ProfileContainer.css'; // Add relevant CSS styling for the component

const ProfileContainer = ({ imageSrc, name, role, bio }) => {
    return (
        <div className="profile-container">
            {/* Profile image */}
            <a href="#" className="profile-trigger">
                <img src={imageSrc} alt={`Profile of ${name}`} className="profile-img" />
            </a>

            {/* Profile card */}
            <div tabIndex="-1" className="profile-card">
                <header>
                    <img src={imageSrc} alt={`Profile of ${name}`} />
                    <h1>{name}</h1>
                    <h2>{role}</h2>
                </header>
                <div className="profile-bio">
                    <p>{bio}</p>
                </div>
                <button className="button button1" style={{fontSize: "12px"}}>دنبال کردن</button>
            </div>
        </div>
    );
};

export default ProfileContainer;
