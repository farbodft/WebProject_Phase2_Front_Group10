import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileContainer from "../ProfileContainer/ProfileContainer";
import FollowedDesignersPopup from "../FollowedDesigners/FollowedDesigners"; // import the new component
import "./PlayerQuestion.css";

function PlayerQuestion() {
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showError, setShowError] = useState("");
    const [foundersInfo, setFoundersInfo] = useState({});
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [isFollowedPopupVisible, setIsFollowedPopupVisible] = useState(false);
    const navigate = useNavigate();

    const username = sessionStorage.getItem("username");

    useEffect(() => {
        fetch("http://localhost:5004/api/categories")
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data)) {
                    setCategories(data);
                } else {
                    console.error("داده‌های دسته‌بندی‌ها صحیح نیستند:", data);
                }
            })
            .catch((error) => console.error("خطا در دریافت دسته‌بندی‌ها:", error));

        fetch("http://localhost:5004/api/questions")
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data)) {
                    setQuestions(data);
                } else if (data.questions && Array.isArray(data.questions)) {
                    setQuestions(data.questions);
                } else {
                    console.error("داده‌های سوالات صحیح نیستند:", data);
                }
            })
            .catch((error) => console.error("خطا در دریافت سوالات:", error));

        fetch(`http://localhost:5004/api/profiles/answeredQuestions/${username}`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setAnsweredQuestions(data);
                } else if (data && Array.isArray(data)) {
                    setAnsweredQuestions(data);
                } else {
                    console.error("داده‌های سوالات پاسخ داده‌شده صحیح نیستند:", data);
                }
            })
            .catch((error) => console.error("خطا در دریافت سوالات پاسخ داده‌شده:", error));
    }, [username]);

    const fetchFounderInfo = (username) => {
        if (!foundersInfo[username]) {
            fetch(`http://localhost:5004/api/tarrahs/${username}`)
                .then((response) => response.json())
                .then((data) => {
                    setFoundersInfo((prev) => ({
                        ...prev,
                        [username]: data,
                    }));
                })
                .catch((error) => {
                    console.error("خطا در دریافت اطلاعات طراح:", error);
                });
        }
    };

    const handleProfileClick = (founder) => {
        setSelectedPlayer(founder);
        setIsProfileVisible(true);
        fetchFounderInfo(founder.username);
    };

    const handleClose = () => {
        setIsProfileVisible(false);
        setSelectedPlayer(null);
    };

    const handleFollowedDesignersClick = () => {
        setIsFollowedPopupVisible(true);
    };

    const handleCloseFollowedPopup = () => {
        setIsFollowedPopupVisible(false);
    };

    const handleStartGame = () => {
        if (!selectedCategory) {
            setShowError("لطفا یک دسته‌بندی انتخاب کنید!");
            return;
        }

        const filteredQuestions = questions.filter(
            (question) => question.category === selectedCategory
        );

        if (filteredQuestions.length > 0) {
            navigate("/QuestionPage", { state: { category: selectedCategory } });
        } else {
            setShowError("هیچ سوالی در این دسته‌بندی یافت نشد.");
        }
    };

    const handleRandomQuestion = () => {
        if (questions.length > 0) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            navigate("/QuestionPage", { state: { random: true } });
        } else {
            console.log("هیچ سوالی در فایل JSON موجود نیست.");
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setShowError("");
    };

    return (
        <div>
            <div className="answeredBox">
                <div className="ribbon">انتخاب بازی</div>
                <button onClick={handleRandomQuestion} className="randomQuestion">
                    سوال تصادفی
                </button>
                <div className="ChooseQuestion">
                    <div className="Questionlabel">
                        دسته‌بندی مورد نظر انتخاب کن و خودت به چالش بکش!
                    </div>
                    <select id="category" onChange={handleCategoryChange} value={selectedCategory}>
                        <option value="" disabled>
                            دسته‌بندی‌ها
                        </option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.categoryName}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleStartGame} className="selectedQuestion">
                        شروع بازی
                    </button>

                    {showError && <div className="error-popup">{showError}</div>}
                </div>
            </div>

            <div className="questionList">
                <div className="text-in-questionList">سوال‌های پاسخ داده‌شده</div>
                <div className="scroll-box">
                    <ul className="question-items">
                        {answeredQuestions.length > 0 ? (
                            answeredQuestions.map((question, index) => {
                                fetchFounderInfo(question.tarrahName);

                                return (
                                    <li key={index} className={question.answered ? "true" : "false"}>
                                        {foundersInfo[question.tarrahName] && (
                                            <img
                                                src={foundersInfo[question.tarrahName].gender === "Male" ? "/photo/man-user.png" : "/photo/woman-user.png"}
                                                alt="تصویر طراح"
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    borderRadius: "50%",
                                                    marginRight: "10px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => handleProfileClick(foundersInfo[question.tarrahName])}
                                            />
                                        )}
                                        {question.text}
                                    </li>
                                );
                            })
                        ) : (
                            <li>هیچ سوالی پاسخ داده نشده است.</li>
                        )}
                    </ul>
                </div>
            </div>

            {isProfileVisible && selectedPlayer && (
                <ProfileContainer
                    imageSrc={selectedPlayer.gender === "Male" ? "/photo/man-user.png" : "/photo/woman-user.png"}
                    following={selectedPlayer.username}
                    role="طراح"
                    bio="سلام! من یکی از طراح های سوال پیچ هستم، خوشحال میشم سوال ها را با بقیه به اشتراک بزارم."
                    follower={username}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}

export default PlayerQuestion;
