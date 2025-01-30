import React, { useEffect, useState } from "react";
import "./List.css";

const List = ({ usage }) => {
    const [items, setItems] = useState(null); // Use one state for both questions and groups
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Determine API path based on usage prop
    const url = usage === "Questions"
        ? "http://localhost:5004/api/questions"
        : "http://localhost:5004/api/categories";


    // Fetch data from the JSON file
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError("No token found, please log in");
            return;
        }
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch! Status: ${response.status}`);
                }
                const data = await response.json();
                setItems(usage === "Questions" ? data.map(q => q.text) : data.map(c => c.categoryName)); // Ensure proper mapping
            } catch (err) {
                setError(`Error fetching data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, usage]);

    // Display error if any
    if (error) {
        return <p className="error">{error}</p>;
    }

    // Display loading message while fetching data
    if (loading) {
        return <p className="loading">Loading {usage.toLowerCase()}...</p>;
    }

    // Display not found if there are no data
    if (!items) {
        return <p className="loading">no {usage.toLowerCase()} found</p>;
    }
    // Render items dynamically
    return (
        <div className="Question" style={{ overflowY: "auto" }}>
            <div className="ribbon">
                {usage === "Questions" ? "سوال‌های موجود" : "دسته‌بندی‌های موجود"}
            </div>
            <div className="addedCategories">
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
