import React from 'react';
import List from "../../Components/ExistingsList/List";
import AddQuestion from "../../Components/QuestionAdding/AddQuestion";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const TarrahQuestionManagement = () => {
    return (
        <div>
            <Navbar usage={"Tarrah"}/>
            <div className={'container'}>
                <AddQuestion />
                <List usage="Questions" />
            </div>
            <Footer/>
        </div>
    );
}

export default TarrahQuestionManagement;
