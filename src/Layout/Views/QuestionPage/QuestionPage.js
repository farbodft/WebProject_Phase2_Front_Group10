import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionContent from '../../Components/QuestionContent/QuestionContent';
import Footer from '../../Components/Footer/Footer';
import Navbar from "../../Components/Navbar/Navbar";

const QuestionPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar usage={"Player"} />
            <QuestionContent />
            <Footer />
        </div>
    );
};

export default QuestionPage;
