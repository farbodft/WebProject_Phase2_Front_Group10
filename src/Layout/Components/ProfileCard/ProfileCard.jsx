import React, {useEffect, useState} from 'react';
import * as jwt_decode from "jwt-decode";
import './ProfileCard.css';

const ProfileCard = ({usage}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('jwtToken');
    // Decode the JWT token to get the username
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;

    const url = usage === "Player"
        ? `http://localhost:5004/api/profiles/${username}`
        : `http://localhost:5004/api/tarrahs/${username}`;

    useEffect(() => {
        if (!token) {
            console.error("No token found, please log in");
            return;
        }

        // Fetch player data from the server
        const fetchUser = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch User data.");
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [usage, username]);

    if (loading) {
        return <div className="loading">در حال بارگذاری...</div>;
    }

    if (error) {
        return <div className="error">خطا: {error}</div>;
    }

    if (!user) {
        return <div className="no-data">{usage === 'Player' ? 'بازیکنی یافت نشد!' : 'طراحی یافت نشد!'}</div>;
    }

    if(usage === "Player") {
        return (
            <div className="card">
                <div className="left-container">
                    <img
                        className="profile"
                        src={user.gender === "Male" ? "/photo/man-user.png" : "/photo/woman-user.png"}
                        alt={`${user.username}'s profile`} />
                    <h2 className="gradienttext">{user.username}</h2>
                    <p>بازیکن</p>
                </div>
                <div className="right-container">
                    <h3 className="gradienttext">اطلاعات بازیکن</h3>
                    <table className="player-info-table">
                        <tbody>
                        <tr>
                            <td className="label">نام کاربری :</td>
                            <td className="value">{user.username}</td>
                        </tr>
                        <tr>
                            <td className="label">تعداد پاسخ ها :</td>
                            <td className="value">{user.challenges}</td>
                        </tr>
                        <tr>
                            <td className="label">ایمیل :</td>
                            <td className="value">{user.email}</td>
                        </tr>
                        <tr>
                            <td className="label">تعداد دنبال کننده:</td>
                            <td className="value">{user.followers.length}</td>
                        </tr>
                        <tr>
                            <td className="label">تعداد دنبال شونده:</td>
                            <td className="value">{user.followings.length}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="credit">برای شروع بازی به بخش مدیریت سوال ها بروید!</div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="card">
                <div className="left-container" style={{backgroundColor: '#E27663'}}>
                    <img className="profile"
                         src={user.gender === "Male" ? "/photo/man-user.png" : "/photo/woman-user.png"}
                         alt="Profile Image" />
                    <h2 className="gradienttext">{user.username}</h2>
                    <p>طراح</p>
                </div>
                <div className="right-container" style={{backgroundColor: '#E27663'}}>
                    <h3 className="gradienttext">اطلاعات طراح</h3>
                    <table className="player-info-table">
                        <tbody>
                        <tr>
                            <td className="label">نام کاربری :</td>
                            <td className="value">{user.username}</td>
                        </tr>
                        <tr>
                            <td className="label">تعداد سوال ها :</td>
                            <td className="value">{user.questionCount}</td>
                        </tr>
                        <tr>
                            <td className="label">ایمیل :</td>
                            <td className="value">{user.email}</td>
                        </tr>
                        <tr>
                            <td className="label">تعداد دنبال کننده:</td>
                            <td className="value">{user.followers.length}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="credit">برای طرح سوال جدید به بخش مدیریت سوال ها بروید!</div>
                </div>
            </div>
        );
    }

};

export default ProfileCard;
