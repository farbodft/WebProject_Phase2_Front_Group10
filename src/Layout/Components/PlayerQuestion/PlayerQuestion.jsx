import React, { useEffect, useState } from "react";
import "./PlayerQuestion.css";

function PlayerQuestion() {
    const [categories, setCategories] = useState([]); // ذخیره دسته‌بندی‌ها
    const [questions, setQuestions] = useState([]); // ذخیره سوالات دسته‌بندی‌ها
    const [answeredQuestions, setAnsweredQuestions] = useState([]); // ذخیره سوالات پاسخ داده‌شده
    const [selectedCategory, setSelectedCategory] = useState(""); // ذخیره دسته‌بندی انتخاب‌شده
    const [showError, setShowError] = useState(false); // برای نمایش پاپ آپ قرمز رنگ

    // بارگذاری داده‌ها از API
    useEffect(() => {
        // دریافت دسته‌بندی‌ها
        fetch("http://localhost:5005/api/categories")
            .then((response) => response.json())
            .then((data) => {
                console.log("Categories Data:", data); // دیباگ: داده‌های دسته‌بندی‌ها را بررسی کن
                if (data && data.groups && Array.isArray(data.groups)) { // بررسی وجود ویژگی groups و نوع آرایه بودن آن
                    setCategories(data.groups); // ذخیره دسته‌بندی‌ها در state
                } else {
                    console.error("داده‌های دسته‌بندی‌ها صحیح نیستند:", data);
                }
            })
            .catch((error) => console.error("Error fetching categories:", error));

        // دریافت سوالات
        fetch("http://localhost:5005/api/questions")
            .then((response) => response.json())
            .then((data) => {
                console.log("Questions Data:", data); // دیباگ: داده‌های سوالات را بررسی کن
                if (data && Array.isArray(data.questions)) { // چک می‌کنیم که آیا سوالات در data.questions وجود دارد
                    setQuestions(data.questions); // ذخیره سوالات مربوط به دسته‌بندی‌ها
                } else {
                    console.error("داده‌های سوالات صحیح نیستند:", data);
                }
            })
            .catch((error) => console.error("Error fetching questions:", error));

        // دریافت سوالات پاسخ داده‌شده
        fetch("http://localhost:5005/api/answered-questions")
            .then((response) => response.json())
            .then((data) => {
                console.log("Answered Questions Data:", data); // دیباگ: داده‌های سوالات پاسخ داده‌شده را بررسی کن
                if (Array.isArray(data)) {
                    setAnsweredQuestions(data); // ذخیره سوالات پاسخ داده‌شده
                } else if (data.answeredQuestions && Array.isArray(data.answeredQuestions)) {
                    setAnsweredQuestions(data.answeredQuestions); // در صورت استفاده از ویژگی answeredQuestions
                } else {
                    console.error("داده‌های سوالات پاسخ داده‌شده صحیح نیستند:", data);
                }
            })
            .catch((error) => console.error("Error fetching answered questions:", error));
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
                    <div className="label">دسته‌بندی مورد نظر انتخاب کن و خودت به چالش بکش!</div>
                    <select
                        id="category"
                        onChange={handleCategoryChange} // استفاده از هندلر جدید
                    >
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
                        {answeredQuestions.length > 0 ? (
                            answeredQuestions.map((question) => (
                                <li
                                    key={question.id}
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
