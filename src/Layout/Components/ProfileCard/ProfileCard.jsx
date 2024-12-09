import React, { useEffect, useState } from "react";
import "./ProfileCard.css";

const ProfileCard = ({ username = "mobina"}) => {
    const [player, setPlayer] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch player data from the server
        const fetchPlayer = async () => {
            try {
                const response = await fetch(`http://localhost:5009/api/player/${username}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch player data.");
                }
                const data = await response.json();
                setPlayer(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayer();
    }, [username]);

    if (loading) {
        return <div className="loading">در حال بارگذاری...</div>;
    }

    if (error) {
        return <div className="error">خطا: {error}</div>;
    }

    if (!player) {
        return <div className="no-data">بازیکنی یافت نشد!</div>;
    }

    return (
        <div className="card">
            <div className="left-container">
                <img
                    className="profile"
                    src={player.imageSrc}
                    alt={`${player.name}'s Profile`}
                />
                <h2 className="gradienttext">{player.name}</h2>
                <p>{player.role}</p>
            </div>
            <div className="right-container">
                <h3 className="gradienttext">اطلاعات بازیکن</h3>
                <table className="player-info-table">
                    <tbody>
                    <tr>
                        <td className="label">نام کاربری :</td>
                        <td className="value">{player.username}</td>
                    </tr>
                    <tr>
                        <td className="label">تعداد چالش‌ها :</td>
                        <td className="value">{player.challenges}</td>
                    </tr>
                    <tr>
                        <td className="label">ایمیل :</td>
                        <td className="value">{player.email}</td>
                    </tr>
                    <tr>
                        <td className="label">تعداد دنبال‌کننده‌ها :</td>
                        <td className="value">{player.followers}</td>
                    </tr>
                    <tr>
                        <td className="label">تعداد دنبال‌شونده‌ها :</td>
                        <td className="value">{player.following}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="credit">برای شروع بازی به بخش مدیریت سوال‌ها بروید!</div>
            </div>
        </div>
    );
};

export default ProfileCard;
