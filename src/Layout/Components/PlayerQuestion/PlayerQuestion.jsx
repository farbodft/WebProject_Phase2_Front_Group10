import React, { useEffect, useState } from "react";
import "./PlayerQuestion.css";

function PlayerQuestion() {
    const [categories, setCategories] = useState([]); // ذخیره دسته‌بندی‌ها
    const [questions, setQuestions] = useState([]); // ذخیره سوالات دسته‌بندی‌ها
    const [answeredQuestions, setAnsweredQuestions] = useState([]); // ذخیره سوالات پاسخ داده‌شده
    const [selectedCategory, setSelectedCategory] = useState(""); // ذخیره دسته‌بندی انتخاب‌شده
    const [showError, setShowError] = useState(false); // برای نمایش پاپ آپ قرمز رنگ

    useEffect(() => {
        // خواندن فایل JSON دسته‌بندی‌ها از مسیر public
        fetch("/ExistingGroups.json")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.groups); // ذخیره دسته‌بندی‌ها در state
            })
            .catch((error) => console.error("Error fetching categories JSON:", error));

        // خواندن فایل JSON سوال‌ها از مسیر public
        fetch("/ExistingQuestions.json")
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data.questions); // ذخیره سوالات مربوط به دسته‌بندی‌ها
            })
            .catch((error) => console.error("Error fetching questions JSON:", error));

        // خواندن فایل JSON سوالات پاسخ داده‌شده از مسیر public
        fetch("/AnsweredQuestions.json")
            .then((response) => response.json())
            .then((data) => {
                setAnsweredQuestions(data.answeredQuestions); // ذخیره سوالات پاسخ داده‌شده در state
            })
            .catch((error) => console.error("Error fetching answered questions JSON:", error));
    }, []);

    // هندلر برای شروع بازی براساس دسته‌بندی انتخاب‌شده
    const handleStartGame = () => {
        if (!selectedCategory) {
            setShowError(true); // نمایش پاپ آپ قرمز رنگ
            return;
        }

        // فیلتر سوال‌ها براساس دسته‌بندی انتخاب‌شده
        const filteredQuestions = questions.filter(
            (question) => question.category === selectedCategory
        );

        if (filteredQuestions.length > 0) {
            // نمایش سوال مربوط به دسته‌بندی در کنسول
            console.log("سوال مربوط به دسته‌بندی انتخاب‌شده:", filteredQuestions[0]);
        } else {
            console.log("هیچ سوالی برای این دسته‌بندی یافت نشد.");
        }
    };

    // هندلر برای نمایش سوال تصادفی
    const handleRandomQuestion = () => {
        if (questions.length > 0) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            console.log("سوال تصادفی:", questions[randomIndex]);
        } else {
            console.log("هیچ سوالی در فایل JSON موجود نیست.");
        }
    };

    // هندلر برای تغییر دسته‌بندی انتخاب‌شده و مخفی کردن پاپ آپ خطا
    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        setSelectedCategory(selected);
        setShowError(false); // پاک کردن پاپ آپ ارور زمانی که دسته‌بندی انتخاب می‌شود

        // فیلتر سوال‌ها براساس دسته‌بندی انتخاب‌شده و نمایش سوال‌ها در کنسول
        if (selected) {
            const filteredQuestions = questions.filter(
                (question) => question.category === selected
            );
            if (filteredQuestions.length > 0) {
                console.log("سوال مربوط به دسته‌بندی انتخاب‌شده:", filteredQuestions[0]);
            }
        }
    };

    return (
        <div>
            {/* باکس انتخاب دسته‌بندی */}
            <div className="answeredBox">
                <div className="ribbon">انتخاب بازی</div>
                <button onClick={handleRandomQuestion} className="randomQuestion">
                    سوال تصادفی
                </button>
                <div className="ChooseQuestion">
                    <div className="Questionlabel">دسته‌بندی مورد نظر انتخاب کن و خودت به چالش بکش!</div>
                    <select
                        id="category"
                        onChange={handleCategoryChange} // استفاده از هندلر جدید
                    >
                        <option value="" disabled selected>
                            دسته‌بندی‌ها
                        </option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleStartGame} className="selectedQuestion">
                        شروع بازی
                    </button>

                    {/* نمایش پاپ آپ قرمز رنگ زمانی که دسته‌بندی انتخاب نشده */}
                    {showError && (
                        <div className="error-popup">
                            لطفا یک دسته‌بندی انتخاب کنید!
                        </div>
                    )}
                </div>
            </div>

            {/* باکس نمایش لیست سوالات پاسخ داده‌شده */}
            <div className="questionList">
                <div className="text-in-questionList">سوال‌های پاسخ داده‌شده</div>
                <div className="scroll-box">
                    <ul className="question-items">
                        {answeredQuestions.map((question) => (
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
        </div>
    );
}

export default PlayerQuestion;

