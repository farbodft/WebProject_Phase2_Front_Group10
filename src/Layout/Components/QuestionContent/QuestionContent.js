import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './QuestionContent.css';
import * as jwt_decode from "jwt-decode";

const QuestionContent = () => {
    const location = useLocation();
    const category = location.state?.category;
    const random = location.state?.random;
    const [questions, setQuestions] = useState([]); // ذخیره سوالات
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // شاخص سوال فعلی
    const [loading, setLoading] = useState(true); // حالت بارگذاری
    const [selectedAnswer, setSelectedAnswer] = useState(null); // ذخیره پاسخ انتخاب شده
    const [showFeedback, setShowFeedback] = useState(false); // نمایش بازخورد
    const [score, setScore] = useState(0); // ذخیره امتیاز
    const token = localStorage.getItem('jwtToken');
    // Decode the JWT token to get the username
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;

    // گرفتن امتیاز بازیکن
    useEffect(() => {
        if (!token) {
            console.error("No token found, please log in");
            return;
        }

        fetch(`http://localhost:5004/api/profiles/${username}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setScore(data.score))
            .catch(error => console.error('Error fetching player score:', error));
    }, [username]);

    useEffect(() => {
        if (!token) {
            console.error("No token found, please log in");
            return;
        }

        let url;
        if (random) {
            url = 'http://localhost:5004/api/questions/random';
        } else if (category) {
            url = `http://localhost:5004/api/questions/${category}`;
        } else {
            return;
        }

        fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setQuestions(data);
                } else {
                    setQuestions([data]);
                }
                setLoading(false);
            })
            .catch(error => console.error('Error fetching categories JSON:', error));
    }, [category, random]);

    const handleAnswerClick = (index) => {
        setSelectedAnswer(index);
        setShowFeedback(true);
        const url = `http://localhost:5004/api/profiles/updateScore/${username}`
        
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = index === currentQuestion.correctChoice;
        const scoreDelta = currentQuestion.difficulty === 'Easy' ? 1 :
                           currentQuestion.difficulty === 'Medium' ? 2 : 3;

        const newScore = isCorrect ? score + scoreDelta : score - scoreDelta;
        setScore(newScore);

        const requestbody = {
            score: newScore,
            text: currentQuestion.text,
            answer: isCorrect
        };

        fetch(url, {
            method: `PUT`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(requestbody),
        });

        setTimeout(() => {
            setShowFeedback(false);
            setSelectedAnswer(null);

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                window.history.back(); // بازگشت به صفحه قبلی
            }
        }, 5000); // ماندن در صفحه به مدت ۵ ثانیه
    };

    if (loading) {
        return <div>در حال بارگذاری سوال...</div>;
    }

    return (
        <div className="quiz-container">
            <div className="score">
                <p>مجموع امتیازات: {score}</p>
            </div>
            <div className="question-box">
                <p>{questions[currentQuestionIndex].text}</p>
            </div>
            <div className="options">
                {questions[currentQuestionIndex].choices.map((choice, index) => (
                    <button
                        key={index}
                        className={`option ${showFeedback && (index === questions[currentQuestionIndex].correctChoice ? 'correct' : (index === selectedAnswer ? 'wrong' : ''))}`}
                        onClick={() => handleAnswerClick(index)}
                        disabled={showFeedback}
                    >
                        {choice}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionContent;
