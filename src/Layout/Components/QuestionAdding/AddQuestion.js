import React, { useEffect, useState } from "react";
import "./AddQuestion.css";

const AddQuestion = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/ExistingCategories.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCategories(data.category);
            } catch (err) {
                setError(`Error fetching groups: ${err.message}`);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="Question">
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
            <button className="container_buttons" style={{ top: "80%" }}>
                طرح سوال
            </button>
        </div>
    );
};

export default AddQuestion;
