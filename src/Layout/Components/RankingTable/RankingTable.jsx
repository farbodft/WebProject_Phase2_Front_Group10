// src/Components/RankingTable.jsx
import React from 'react';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import './RankingTable.css';

const RankingTable = () => {
    const players = [
        {
            id: 1,
            name: 'mobina',
            role: 'بازیکن',
            bio: 'سلام! منم یکی از بازیکن‌های سوال پیچ هستم، خوشحال میشم باهم رقابت کنیم.',
            imageSrc: '/photo/woman-user.png',
            rank: 1,
            username: 'mobina',
            challenges: 26,
            score: 1230,
        },
        {
            id: 2,
            name: 'mahsa',
            role: 'بازیکن',
            bio: 'سلام! منم یکی از بازیکن‌های سوال پیچ هستم، خوشحال میشم باهم رقابت کنیم.',
            imageSrc: '/photo/woman-user.png',
            rank: 2,
            username: 'mahsa',
            challenges: 25,
            score: 1200,
        },
        {
            id: 3,
            name: 'farbod',
            role: 'بازیکن',
            bio: 'سلام! منم یکی از بازیکن‌های سوال پیچ هستم، خوشحال میشم باهم رقابت کنیم.',
            imageSrc: '/photo/man-user.png',
            rank: 3,
            username: 'farbod',
            challenges: 24,
            score: 1095,
        },
        {
            id: 4,
            name: 'elnaz',
            role: 'بازیکن',
            bio: 'سلام! منم یکی از بازیکن‌های سوال پیچ هستم، خوشحال میشم باهم رقابت کنیم.',
            imageSrc: '../photo/woman-user.png',
            rank: 4,
            username: 'elnaz',
            challenges: 23,
            score: 1000,
        },
        {
            id: 5,
            name: 'mohammad',
            role: 'بازیکن',
            bio: 'سلام! منم یکی از بازیکن‌های سوال پیچ هستم، خوشحال میشم باهم رقابت کنیم.',
            imageSrc: '../photo/man-user.png',
            rank: 5,
            username: 'mohammad',
            challenges: 22,
            score: 995,
        },
        {
            id: 6,
            name: 'maral',
            role: 'بازیکن',
            bio: 'سلام! منم یکی از بازیکن‌های سوال پیچ هستم، خوشحال میشم باهم رقابت کنیم.',
            imageSrc: '../photo/woman-user.png',
            rank: 6,
            username: 'maral',
            challenges: 21,
            score: 950,
        },
        {
            id: 7,
            name: 'milad',
            role: 'بازیکن',
            bio: 'سلام! منم یکی از بازیکن‌های سوال پیچ هستم، خوشحال میشم باهم رقابت کنیم.',
            imageSrc: '../photo/man-user.png',
            rank: 7,
            username: 'milad',
            challenges: 20,
            score: 943,
        },
        {
            id: 8,
            name: 'ali',
            role: 'بازیکن',
            bio: 'سلام! منم یکی از بازیکن‌های سوال پیچ هستم، خوشحال میشم باهم رقابت کنیم.',
            imageSrc: '../photo/man-user.png',
            rank: 8,
            username: 'ali',
            challenges: 19,
            score: 900,
        },
        {
            id: 9,
            name: 'melika',
            role: 'بازیکن',
            bio: 'سلام! منم یکی از بازیکن‌های سوال پیچ هستم، خوشحال میشم باهم رقابت کنیم.',
            imageSrc: '../photo/woman-user.png',
            rank: 9,
            username: 'melika',
            challenges: 18,
            score: 870,
        },
        {
            id: 10,
            name: 'yalda',
            role: 'بازیکن',
            bio: 'سلام! منم یکی از بازیکن‌های سوال پیچ هستم، خوشحال میشم باهم رقابت کنیم.',
            imageSrc: '../photo/woman-user.png',
            rank: 10,
            username: 'yalda',
            challenges: 17,
            score: 853,
        },
    ];

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
                            key={player.id}
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
