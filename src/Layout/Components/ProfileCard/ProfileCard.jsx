import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({usage}) => {
    if(usage === "Player") {
        return (
            <div className="card">
                <div className="left-container">
                    <img className="profile" src="/photo/woman-user.png" alt="Profile Image" />
                    <h2 className="gradienttext">mobina</h2>
                    <p>بازیکن</p>
                </div>
                <div className="right-container">
                    <h3 className="gradienttext">اطلاعات بازیکن</h3>
                    <table className="player-info-table">
                        <tbody>
                        <tr>
                            <td className="label">نام کاربری :</td>
                            <td className="value">mobina</td>
                        </tr>
                        <tr>
                            <td className="label">تعداد پاسخ ها :</td>
                            <td className="value">35</td>
                        </tr>
                        <tr>
                            <td className="label">ایمیل :</td>
                            <td className="value">mobina.rashidi03@gmail.com</td>
                        </tr>
                        <tr>
                            <td className="label">تعداد دنبال کننده ها :</td>
                            <td className="value">123</td>
                        </tr>
                        <tr>
                            <td className="label">تعداد دنبال شونده ها :</td>
                            <td className="value">200</td>
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
                    <img className="profile" src="/photo/man-user.png" alt="Profile Image" />
                    <h2 className="gradienttext">farbod</h2>
                    <p>طراح</p>
                </div>
                <div className="right-container" style={{backgroundColor: '#E27663'}}>
                    <h3 className="gradienttext">اطلاعات طراح</h3>
                    <table className="player-info-table">
                        <tbody>
                        <tr>
                            <td className="label">نام کاربری :</td>
                            <td className="value">farbod</td>
                        </tr>
                        <tr>
                            <td className="label">تعداد سوال ها :</td>
                            <td className="value">35</td>
                        </tr>
                        <tr>
                            <td className="label">ایمیل :</td>
                            <td className="value">farbod_fattahi05@gmail.com</td>
                        </tr>
                        <tr>
                            <td className="label">تعداد دنبال کننده ها :</td>
                            <td className="value">123</td>
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
