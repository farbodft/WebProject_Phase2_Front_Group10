import React, { useState, useEffect } from 'react';
import './ProfileContainer.css';

const ProfileContainer = ({ imageSrc, following, role, bio, follower, onClose }) => {
    const [isFollowing, setIsFollowing] = useState(false); // Track if the user is following
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const [popupMessage, setPopupMessage] = useState(''); // Track the popup message
    const [isPopupVisible, setIsPopupVisible] = useState(false); // Track the popup visibility
    const [isSuccess, setIsSuccess] = useState(false); // Track the success of the follow action
    console.log(following,follower);
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        if (!token) {
            console.error("No token found, please log in");
            return;
        }
        const checkFollowingStatus = async () => {
            try {
                let response;
                if (role === 'بازیکن') {
                    response = await fetch(`http://localhost:5004/api/profiles/following/${following}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                } else if (role === 'طراح') {
                    response = await fetch(`http://localhost:5004/api/tarrahs/followers/${follower}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                }

                // بررسی اینکه پاسخ معتبر است یا خیر
                if (!response.ok) {
                    throw new Error('Failed to fetch following status');
                }

                const data = await response.json();

                if (data.followings && data.followings.includes(follower)) {
                    setIsFollowing(true);
                }
            } catch (error) {
                console.error('Error checking followings:', error);
            }
        };

        if (follower && following) {
            checkFollowingStatus(); // Check follow status when component is mounted
        }
    }, [follower, following, role]);


    const handleFollow = async () => {
        setIsLoading(true); // Start loading

        try {
            let response;
            if (role === 'بازیکن') {
                response = await fetch(`http://localhost:5004/api/profiles/following/${following}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ follower }),
                });
            } else if (role === 'طراح') {
                response = await fetch(`http://localhost:5004/api/tarrahs/followers/${following}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ follower }),
                });
            }

            if (response.ok) {
                setIsFollowing(true);
                setPopupMessage('دنبال کردن موفقیت آمیز بود');
                setIsSuccess(true);
            } else if (response.status === 409) {
                setPopupMessage('شما این کاربر را دنبال کرده‌اید');
                setIsSuccess(false);
            } else {
                setPopupMessage(`خطا در دنبال کردن کاربر: ${response.status}`);
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Error while sending follow request:', error);
            setPopupMessage('خطا در دنبال کردن کاربر');
            setIsSuccess(false);
        }
        setIsLoading(false); // End loading
        setIsPopupVisible(true); // Show the popup
        setTimeout(() => setIsPopupVisible(false), 3000); // Hide the popup after 3 seconds
    };

    const handleCloseClick = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="profile-container">
            <div tabIndex="-1" className="profile-card">
                <button className="close-button" onClick={handleCloseClick}>X</button>
                <header>
                    <img src={imageSrc} alt={`Profile of ${following}`} />
                    <h1>{following}</h1>
                    <h2 className="profile-role">{role}</h2>
                </header>
                <div className="profile-bio">
                    <p>{bio}</p>
                </div>
                <button className="button-check" onClick={handleFollow} disabled={isLoading} style={{ fontSize: "12px" }}>
                    {isLoading ? 'در حال ارسال...' : isFollowing ? 'دنبال کرده' : 'دنبال کردن'}
                </button>
                {isPopupVisible && (
                    <div className={`popup-message ${isSuccess ? 'success' : 'error'}`}>
                        {popupMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileContainer;
