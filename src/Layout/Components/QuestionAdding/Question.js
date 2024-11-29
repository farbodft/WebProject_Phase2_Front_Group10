import React from 'react';
import './Question.css';

const Question = () => {
    return (
        <div className="Question" id="#createQuestion">
            <div className="ribbon">طرح سوال جدید</div>
            <div className="label">یک سوال جدید طرح کن!</div>
            <input
                className="question_marks"
                type="text"
                placeholder="صورت سوال"
            />
            <div className="choices">
                <input className="choice" type="text" placeholder="گزینه 1" />
                <input className="choice" type="text" placeholder="گزینه 2" />
                <input className="choice" type="text" placeholder="گزینه 3" />
                <input className="choice" type="text" placeholder="گزینه 4" />
            </div>
            <div className="Selection">
                <select title="دسته بندی" defaultValue="">
                    <option value="" disabled>
                        دسته بندی
                    </option>
                    <option>هوش</option>
                    <option>ریاضی</option>
                    <option>سینما</option>
                </select>
                <select title="درجه سختی" defaultValue="">
                    <option value="" disabled>
                        درجه سختی
                    </option>
                    <option value="simple">ساده</option>
                    <option value="medium">متوسط</option>
                    <option value="hard">سخت</option>
                </select>
                <select title="گزینه درست" defaultValue="">
                    <option value="" disabled>
                        گزینه درست
                    </option>
                    <option value="1">گزینه 1</option>
                    <option value="2">گزینه 2</option>
                    <option value="3">گزینه 3</option>
                    <option value="4">گزینه 4</option>
                </select>
            </div>
            <button className="container_buttons" style={{ top: '80%' }}>
                طرح سوال
            </button>
        </div>
    );
};

export default Question;
