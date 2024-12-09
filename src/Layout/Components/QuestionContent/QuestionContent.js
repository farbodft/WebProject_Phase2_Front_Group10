import React from 'react';
import './QuestionContent.css'; 

const QuestionContent = () => {
    return (
        <div className="quiz-container">
            <div className="score">
                <p>مجموع امتیازات:۱۲۶</p>
            </div>

            <div className="question-box">
                <p>متن سوال</p>
            </div>

            <div className="options">
                <button className="option correct">گزینه صحیح</button>
                <button className="option wrong">گزینه اشتباه</button>
                <button className="option">گزینه ۳</button>
                <button className="option">گزینه ۴</button>
            </div>
        </div>
    );
};

export default QuestionContent;
