import React, { useEffect, useState } from "react";
import "./AddQuestion.css";

const AddQuestion = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [text, setText] = useState(null);
    const [choice1, setChoice1] = useState(null);
    const [choice2, setChoice2] = useState(null);
    const [choice3, setChoice3] = useState(null);
    const [choice4, setChoice4] = useState(null);
    const [category, setCategory] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [correctChoice, setCorrectChoice] = useState(null);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5004/api/categories");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCategories(data.categories.map(c => c.categoryName));
            } catch (err) {
                setError(`Error fetching groups: ${err.message}`);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async () => {
        if (!text) {
            alert("لطفا صورت سوال را وارد کنید.");
            return;
        } else if (!choice1 || !choice2 || !choice3 || !choice4) {
            alert("لطفا گزینه ها را وارد کنید.");
            return;
        } else if (!category) {
            alert("لطفا دسته بندی سوال را مشخص کنید.");
            return;
        } else if (!difficulty) {
            alert("لطفا درجه سختی را مشخص کنید.");
            return;
        } else if (!correctChoice) {
            alert("لطفا گزینه ی درست را مشخص کنید.");
            return;
        }

        const questionData = {
            category,
            text,
            choices: [choice1, choice2, choice3, choice4],
            correctChoice: parseInt(correctChoice),
            difficulty,
            tarrahName: "Sara Mohammadi", //Mocked value
        };

        try {
            const response = await fetch("http://localhost:5004/api/questions/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(questionData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            alert("سوال با موفقیت اضافه شد!");
            window.location.reload();
        } catch (err) {
            alert(`ارور در افزودن سوال: ${err.message}`);
            console.log(err);
        }
    };

    return (
        <div className="Question">
            <div className="ribbon">طرح سوال جدید</div>
            <div className="label">یک سوال جدید طرح کن!</div>
            <input
                className="question_marks"
                type="text"
                placeholder="صورت سوال"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="choices">
                <input
                    className="choice"
                    type="text"
                    placeholder="گزینه 1"
                    value={choice1}
                    onChange={(e) => setChoice1(e.target.value)}
                />
                <input
                    className="choice"
                    type="text"
                    placeholder="گزینه 2"
                    value={choice2}
                    onChange={(e) => setChoice2(e.target.value)}
                />
                <input
                    className="choice"
                    type="text"
                    placeholder="گزینه 3"
                    value={choice3}
                    onChange={(e) => setChoice3(e.target.value)}
                />
                <input
                    className="choice"
                    type="text"
                    placeholder="گزینه 4"
                    value={choice4}
                    onChange={(e) => setChoice4(e.target.value)}
                />
            </div>
            <div className="Selection">
                <select title="دسته بندی" value={category} onChange={(e) => setCategory(e.target.value)} defaultValue="">
                    <option value="" disabled>
                        دسته بندی
                    </option>
                    {error ? (
                        <option disabled>Failed to load categories</option>
                    ) : categories.length > 0 ? (
                        categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))
                    ) : (
                        <option disabled>Loading...</option>
                    )}
                </select>
                <select title="درجه سختی" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} defaultValue="">
                    <option value="" disabled>
                        درجه سختی
                    </option>
                    <option value="simple">ساده</option>
                    <option value="medium">متوسط</option>
                    <option value="hard">سخت</option>
                </select>
                <select title="گزینه درست" value={correctChoice} onChange={(e) => setCorrectChoice(e.target.value)} defaultValue="">
                    <option value="" disabled>
                        گزینه درست
                    </option>
                    <option value="1">گزینه 1</option>
                    <option value="2">گزینه 2</option>
                    <option value="3">گزینه 3</option>
                    <option value="4">گزینه 4</option>
                </select>
            </div>
            <button className="container_buttons" style={{ top: "80%" }} onClick={handleSubmit}>
                طرح سوال
            </button>
        </div>
    );
};

export default AddQuestion;
