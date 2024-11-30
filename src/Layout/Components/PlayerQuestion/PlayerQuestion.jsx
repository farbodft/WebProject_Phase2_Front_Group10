import React from "react";
import "./PlayerQuestion.css";

function PlayerQuestion() {
    const questions = [
        { id: 1, text: "سوال 1: متن سوال اول", answered: true },
        { id: 2, text: "سوال 2: متن سوال دوم", answered: true },
        { id: 3, text: "سوال 3: متن سوال سوم", answered: false },
        { id: 4, text: "سوال 4: متن سوال چهارم", answered: true },
        { id: 5, text: "سوال 5: متن سوال پنجم", answered: false },
        { id: 6, text: "سوال 6: متن سوال ششم", answered: false },
        { id: 7, text: "سوال 7: متن سوال هفتم", answered: true },
        { id: 8, text: "سوال 8: متن سوال هشتم", answered: false },
        { id: 9, text: "سوال 9: متن سوال نهم", answered: true },
        { id: 10, text: "سوال 10: متن سوال دهم", answered: false },
    ];

    return (
        <div>
        <div className="questionList">
            <div className="text-in-questionList">سوال های پاسخ داده شده</div>
            <div className="scroll-box">
                <ul className="question-items">
                    {questions.map((question) => (
                        <li
                            key={question.id}
                            className={question.answered ? "true" : "false"}
                        >
                            {question.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    <div className="answeredBox">
        <div className="ribbon">انتخاب بازی</div>
        <button
            onClick={() => (window.location.href = "Questionpage.html")}
            className="randomQuestion"
        >
            سوال تصادفی
        </button>
        <div className="ChooseQuestion">
            <div className="label">دسته بندی مورد نظر انتخاب کن و خودت به چالش بکش!</div>
            <select id="category">
                <option value="" disabled selected>
                    دسته بندی ها
                </option>
                <option value="first">تاریخی</option>
                <option value="second">ریاضی</option>
                <option value="third">هوش</option>
                <option value="fourth">اطلاعات عمومی</option>
            </select>
            <button
                onClick={() => (window.location.href = "Questionpage.html")}
                className="selectedQuestion"
            >
                شروع بازی
            </button>
        </div>
    </div>

        </div>
    );
}

export default PlayerQuestion;
