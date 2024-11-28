import React from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
    return (
        <div className="card">
            <div className="left-container">
                <img className="profile" src="/photo/woman-user.png" alt="Profile Image" />
                <h2 className="gradienttext">mobina</h2>
                <p>بازیکن</p>
            </div>
            <div className="right-container">
                <h3 className="gradienttext">اطلاعات بازیکن</h3>
                <table>
                    <tr>
                        <td>نام کاربری :</td>
                        <td>mobina</td>
                    </tr>
                    <tr>
                        <td>تعداد پاسخ ها :</td>
                        <td>35</td>
                    </tr>
                    <tr>
                        <td>ایمیل :</td>
                        <td>mobina.rashidi03@gmail.com</td>
                    </tr>
                    <tr>
                        <td>تعداد دنبال کننده ها :</td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>تعداد دنبال شونده ها :</td>
                        <td>200</td>
                    </tr>
                </table>
                <div className="credit">برای شروع بازی به بخش مدیریت سوال ها بروید!</div>
            </div>
        </div>
    );
};

export default ProfileCard;
