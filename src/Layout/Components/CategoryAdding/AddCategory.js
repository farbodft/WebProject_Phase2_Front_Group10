import React, { useState } from 'react';
import './AddCategory.css';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [addingError, setAddingError] = useState(" ");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!categoryName.trim()) {
            setAddingError(".لطفاً یک نام برای دسته‌بندی وارد کنید");
            return;
        }

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setAddingError("No token found, please log in");
            return;
        }

        try {
            const response = await fetch("http://localhost:5004/api/categories/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ "categoryName": categoryName.trim() }),
            });

            const data = await response.text();

            if (response.status === 201) {
                //alert(data.message); // Success message
                setAddingError(" ");
                navigate('/TarrahCategoryManagement');
            } else if (response.status === 409) {
                //alert(data.message); // Duplicate category message
                setAddingError(data);
            } else {
                setAddingError(".مشکلی پیش آمده است، لطفاً دوباره تلاش کنید");
            }
        } catch (error) {
            // console.log("Error:", error);
            alert("مشکلی در برقراری ارتباط با سرور پیش آمده است.");
            console.log(error);
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
            {addingError && <div className="error">{addingError}</div>}
        </div>
    );
};

export default AddCategory;
