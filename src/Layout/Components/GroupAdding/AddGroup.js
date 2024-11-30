import React from 'react';
import './AddGroup.css';

const AddGroup = () => {
    return (
        <div className="Question">
            <div className="ribbon">افزودن دسته بندی</div>
            <div className="label">دسته بندی موردنظرت رو اضافه کن</div>
            <input className="question_marks" type="text" placeholder="نام دسته بندی" />
            <button className="container_buttons">ثبت دسته بندی</button>
        </div>
    );
};

export default AddGroup;
