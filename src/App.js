import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionBox from './Layout/Views/QuestionBox/QuestionBox';
import ScoreTable from './Layout/Views/ScoreTable/ScoreTable';
import MainPlayerPage from './Layout/Views/MainPlayerPage/MainPlayerPage';
import FirstPage from './Layout/Views/FirstPage/FirstPage';
import LoginPage from './Layout/Views/LoginPage/LoginPage';
import QuestionPage from './Layout/Views/QuestionPage/QuestionPage'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FirstPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/QuestionBox" element={<QuestionBox />} />
                <Route path="/ScoreTable" element={<ScoreTable />} />
                <Route path="/MainPlayerPage" element={<MainPlayerPage />} />
                <Route path="/QuestionPage" element={<QuestionPage />} /> 
            </Routes>
        </Router>
    );
};

export default App;
