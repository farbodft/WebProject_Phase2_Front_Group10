import React, { useEffect, useState } from "react";
import "./List.css";

const List = ({ usage }) => {
    const [items, setItems] = useState([]); // Use one state for both questions and groups
    const [error, setError] = useState(null);

    // Determine JSON path based on usage prop
    const jsonPath = usage === "Questions"
        ? "/ExistingQuestions.json"
        : "/ExistingGroups.json";

    // Fetch data from the JSON file
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(jsonPath);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setItems(usage === "Questions" ? data.questions : data.groups); // Ensure proper mapping
            } catch (err) {
                setError(`Error fetching data: ${err.message}`);
            }
        };

        fetchData();
    }, [jsonPath, usage]);

    // Display error if any
    if (error) {
        return <p className="error">{error}</p>;
    }

    // Display loading message while fetching data
    if (!items || items.length === 0) {
        return <p className="loading">Loading {usage.toLowerCase()}...</p>;
    }

    // Render items dynamically
    return (
        <div className="Question" style={{ overflowY: "auto" }}>
            <div className="ribbon">
                {usage === "Questions" ? "سوال‌های موجود" : "دسته‌بندی‌های موجود"}
            </div>
            <div className="addedGroups">
                {items.map((item, index) => (
                    <h1 key={index}>
                        <b>{item}</b>
                    </h1>
                ))}
            </div>
        </div>
    );
};

export default List;
