import React, { useEffect, useState } from "react";
import "./FollowedDesigners.css";

function FollowedDesigners() {
    const [followedDesigners, setFollowedDesigners] = useState([]);
    const username = sessionStorage.getItem("username");
    useEffect(() => {
        fetch(`http://localhost:5004/api/tarrahs/followingsQuestions/${username}`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setFollowedDesigners(data);
                } else if (data.followedQuestions && Array.isArray(data.followedQuestions)) {
                    setFollowedDesigners(data.followedQuestions);
                } else {
                    console.error("داده‌های طراحان دنبال‌شده صحیح نیستند:", data);
                }
            })
            .catch((error) => console.error("خطا در دریافت اطلاعات طراحان دنبال‌شده:", error));
    }, [username]);

    return (
        <div className="followed-designers-container">
            <div className="title">طراح های دنبال شده</div>
            <ul className="designer-items">
                {followedDesigners.length > 0 ? (
                    followedDesigners.map((designer, index) => (
                        <li key={index} className="designer-item">
                            <img
                                src={designer.gender === "Male" ? "/photo/man-user.png" : "/photo/woman-user.png"}
                                alt="تصویر طراح"
                                className="designer-avatar"
                            />
                            <div className="designer-info">
                                <div className="designer-username">{designer.username}</div>
                                <ul className="question-list">
                                    {designer.questions.map((question, qIndex) => (
                                        <li key={qIndex} className="question-item">{question}</li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>هیچ طراح دنبال‌شده‌ای وجود ندارد.</li>
                )}
            </ul>
        </div>
    );
}

export default FollowedDesigners;
