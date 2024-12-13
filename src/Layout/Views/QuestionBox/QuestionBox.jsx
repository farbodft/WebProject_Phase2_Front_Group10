import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import PlayerQuestion from "../../Components/PlayerQuestion/PlayerQuestion";

const QuestionBox = () => {
    return (
        <div>
            <Navbar usage={"Player"}/>
            <PlayerQuestion/>
            <Footer/>
        </div>
    );
};

export default QuestionBox;
