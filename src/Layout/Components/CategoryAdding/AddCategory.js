import React, { useState } from 'react';
import './AddCategory.css';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState("");

    const handleSubmit = async () => {
        if (!categoryName.trim()) {
            alert("لطفاً یک نام برای دسته‌بندی وارد کنید.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5008/api/categories/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ categoryName: categoryName.trim() }),
            });

            const data = await response.json();

            if (response.status === 201) {
                alert(data.message); // Success message
                window.location.reload();
            } else if (response.status === 409) {
                alert(data.message); // Duplicate category message
            } else {
                alert("مشکلی پیش آمده است، لطفاً دوباره تلاش کنید.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("مشکلی در برقراری ارتباط با سرور پیش آمده است.");
        }
    };

    return (
        <div className="Question">
            <div className="ribbon">افزودن دسته بندی</div>
            <div className="label">دسته بندی موردنظرت رو اضافه کن</div>
            <input
                className="question_marks"
                type="text"
                placeholder="نام دسته بندی"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)} // Update state on input change
            />
            <button className="container_buttons" onClick={handleSubmit}>
                ثبت دسته بندی
            </button>
        </div>
    );
};

export default AddCategory;
