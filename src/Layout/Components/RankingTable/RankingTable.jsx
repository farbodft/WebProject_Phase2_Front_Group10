import React, { useState, useEffect } from 'react';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import './RankingTable.css';

const RankingTable = () => {
    const [players, setPlayers] = useState([]); // لیست بازیکنان
    const [loading, setLoading] = useState(true); // وضعیت بارگذاری
    const [error, setError] = useState(null); // مدیریت خطا
    const [selectedPlayer, setSelectedPlayer] = useState(null); // پروفایل انتخاب‌شده
    const [isProfileVisible, setIsProfileVisible] = useState(false); // وضعیت نمایش پروفایل
    const username = sessionStorage.getItem("username");
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('http://localhost:5004/api/profiles/players');
                if (!response.ok) {
                    throw new Error('Failed to fetch player profiles.');
                }
                const data = await response.json();

                const sortedPlayers = data
                    .sort((a, b) => b.score - a.score)
                    .map((player, index) => ({
                        ...player,
                        rank: index + 1,
                    }));

                setPlayers(sortedPlayers);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    const handleProfileClick = (player) => {
        setSelectedPlayer(player);
        setIsProfileVisible(true);
        console.log("Selected Player:", player); // اضافه کردن لاگ
        console.log({username});
    };

    const handleClose = () => {
        console.log("Close action triggered!"); // اضافه کردن لاگ
        setIsProfileVisible(false);
        setSelectedPlayer(null);
    };

    if (loading) {
        return <div className="loading">در حال بارگذاری...</div>;
    }

    if (error) {
        return <div className="error">خطا: {error}</div>;
    }

    return (
        <div>
            <table className="ranking-table">
                <thead>
                <tr>
                    <th className="ranking-table-th">پروفایل</th>
                    <th className="ranking-table-th">رتبه</th>
                    <th className="ranking-table-th">نام کاربری</th>
                    <th className="ranking-table-th">تعداد چالش‌ها</th>
                    <th className="ranking-table-th">امتیاز</th>
                </tr>
                </thead>
                <tbody>
                {players.map((player) => (
                    <tr
                        key={player.username}
                        className={player.rank % 2 === 0 ? 'ranking-table-tr-even' : 'ranking-table-tr-odd'}
                        onClick={() => handleProfileClick(player)}
                    >
                        <td className="ranking-table-td">
                            <img
                                src={player.gender === "Male" ? "/photo/man-user.png" : "/photo/woman-user.png"}
                                alt="profile"
                                className="profile-img"
                            />
                        </td>
                        <td className="ranking-table-td">{player.rank}</td>
                        <td className="ranking-table-td">{player.username}</td>
                        <td className="ranking-table-td">{player.challenges}</td>
                        <td className="ranking-table-td">{player.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isProfileVisible && selectedPlayer && (
                <ProfileContainer
                    imageSrc={selectedPlayer.gender === "Male" ? "/photo/man-user.png" : "/photo/woman-user.png"}
                    following={selectedPlayer.username}
                    role="بازیکن"
                    bio="سلام! منم یکی از بازیکن‌های سوال پیچ هستم، خوشحال میشم باهم رقابت کنیم."
                    follower={username}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default RankingTable;
