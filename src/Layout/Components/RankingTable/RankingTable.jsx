import React, { useEffect, useState } from 'react';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import './RankingTable.css';

const RankingTable = () => {
    const [players, setPlayers] = useState([]); // لیست بازیکنان
    const [loading, setLoading] = useState(true); // وضعیت بارگذاری
    const [error, setError] = useState(null); // مدیریت خطا

    useEffect(() => {
        // دریافت اطلاعات پروفایل از API
        const fetchProfiles = async () => {
            try {
                const response = await fetch('http://localhost:5008/api/profiles');
                if (!response.ok) {
                    throw new Error('Failed to fetch player profiles.');
                }
                const data = await response.json();

                // مرتب‌سازی بازیکنان بر اساس امتیاز به صورت نزولی
                const sortedPlayers = data
                    .sort((a, b) => b.score - a.score) // مرتب کردن
                    .map((player, index) => ({
                        ...player,
                        rank: index + 1, // تعیین رتبه بازیکن
                    }));

                setPlayers(sortedPlayers); // ذخیره بازیکنان مرتب‌شده
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

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
                    >
                        <td className="ranking-table-td">
                            <ProfileContainer
                                imageSrc={player.imageSrc}
                                name={player.name}
                                role={player.role}
                                bio={player.bio}
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
        </div>
    );
};

export default RankingTable;
