import React, { useEffect, useState } from "react";
import "./PlayerQuestion.css";

function PlayerQuestion({ username = "mobina"}) {
    const [categories, setCategories] = useState([]); // ذخیره دسته‌بندی‌ها
    const [questions, setQuestions] = useState([]); // ذخیره سوالات دسته‌بندی‌ها
    const [answeredQuestions, setAnsweredQuestions] = useState([]); // ذخیره سوالات پاسخ داده‌شده
    const [selectedCategory, setSelectedCategory] = useState(""); // ذخیره دسته‌بندی انتخاب‌شده
    const [showError, setShowError] = useState(false); // برای نمایش پاپ آپ قرمز رنگ

    // بارگذاری داده‌ها از API
    useEffect(() => {
        // دریافت دسته‌بندی‌ها
        fetch("http://localhost:5008/api/categories")
            .then((response) => response.json())
            .then((data) => {
                if (data && data.groups && Array.isArray(data.groups)) {
                    setCategories(data.groups);
                } else {
                    console.error("داده‌های دسته‌بندی‌ها صحیح نیستند:", data);
                }
            })
            .catch((error) => console.error("Error fetching categories:", error));

        // دریافت سوالات
        fetch("http://localhost:5008/api/questions")
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data.questions)) {
                    setQuestions(data.questions);
                } else {
                    console.error("داده‌های سوالات صحیح نیستند:", data);
                }
            })
            .catch((error) => console.error("Error fetching questions:", error));

        // دریافت سوالات پاسخ داده‌شده بر اساس username
        fetch(`http://localhost:5008/api/answered-questions/${username}`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setAnsweredQuestions(data);
                } else if (data.answeredQuestions && Array.isArray(data.answeredQuestions)) {
                    setAnsweredQuestions(data.answeredQuestions);
                } else {
                    console.error("داده‌های سوالات پاسخ داده‌شده صحیح نیستند:", data);
                }
            })
            .catch((error) => console.error("Error fetching answered questions:", error));
    }, [username]);

    // هندلر برای شروع بازی براساس دسته‌بندی انتخاب‌شده
    const handleStartGame = () => {
        if (!selectedCategory) {
            setShowError(true);
            return;
        }

        const filteredQuestions = questions.filter(
            (question) => question.category === selectedCategory
        );

        if (filteredQuestions.length > 0) {
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

    // هندلر برای تغییر دسته‌بندی انتخاب‌شده
    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        setSelectedCategory(selected);
        setShowError(false);

        const filteredQuestions = questions.filter(
            (question) => question.category === selected
        );

        if (filteredQuestions.length > 0) {
            console.log("سوال مربوط به دسته‌بندی انتخاب‌شده:", filteredQuestions[0]);
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
                    <div className="label">دسته‌بندی مورد نظر انتخاب کن و خودت به چالش بکش!</div>
                    <select id="category" onChange={handleCategoryChange}>
                        <option value="" disabled selected>
                            دسته‌بندی‌ها
                        </option>
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))
                        ) : (
                            <option disabled>دسته‌بندی‌ها بارگذاری نمی‌شوند.</option>
                        )}
                    </select>
                    <button onClick={handleStartGame} className="selectedQuestion">
                        شروع بازی
                    </button>

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
                        {answeredQuestions.length > 0 ? (
                            answeredQuestions.map((question, index) => (
                                <li
                                    key={index}
                                    className={question.answered ? "true" : "false"}
                                >
                                    {question.text}
                                </li>
                            ))
                        ) : (
                            <li>هیچ سوالی پاسخ داده نشده است.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PlayerQuestion;
