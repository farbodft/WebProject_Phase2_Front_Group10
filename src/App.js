import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionBox from './Layout/Views/QuestionBox/QuestionBox';
import ScoreTable from './Layout/Views/ScoreTable/ScoreTable';
import MainPlayerPage from './Layout/Views/MainPlayerPage/MainPlayerPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPlayerPage />} />
                <Route path="/QuestionBox" element={<QuestionBox />} />
                <Route path="/ScoreTable" element={<ScoreTable />} />
            </Routes>
        </Router>
    );
};

export default App;