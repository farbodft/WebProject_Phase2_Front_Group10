import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './QuestionContent.css';
import text from 'body-parser/lib/types/text';

const QuestionContent = () => {
    const location = useLocation();
    const category = location.state?.category;
    const random = location.state?.random;
    const username = sessionStorage.getItem("username");
    const [questions, setQuestions] = useState([]); // ذخیره سوالات
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // شاخص سوال فعلی
    const [loading, setLoading] = useState(true); // حالت بارگذاری
    const [selectedAnswer, setSelectedAnswer] = useState(null); // ذخیره پاسخ انتخاب شده
    const [showFeedback, setShowFeedback] = useState(false); // نمایش بازخورد
    const [score, setScore] = useState(0); // ذخیره امتیاز

    // گرفتن امتیاز بازیکن
    useEffect(() => {
        fetch(`http://localhost:5004/api/profiles/${username}`)
            .then(response => response.json())
            .then(data => setScore(data.score))
            .catch(error => console.error('Error fetching player score:', error));
    }, [username]);

    useEffect(() => {
        let url;
        if (random) {
            url = 'http://localhost:5004/api/answering/random';
        } else if (category) {
            url = `http://localhost:5004/api/answering/category/${category}`;
        } else {
            return;
        }

        fetch(url)
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

        if (isCorrect) {
            setScore(prevScore => prevScore + scoreDelta);
        } else {
            setScore(prevScore => prevScore - scoreDelta);
        }

        const requestbody = {
            score: score,
            text: currentQuestion.text,
            answer: isCorrect
        };

        fetch(url, {
            method: `PUT`,
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
