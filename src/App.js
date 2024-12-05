import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionBox from './Layout/Views/QuestionBox/QuestionBox';
import ScoreTable from './Layout/Views/ScoreTable/ScoreTable';
import MainPlayerPage from './Layout/Views/MainPlayerPage/MainPlayerPage';
import FirstPage from './Layout/Views/FirstPage/FirstPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FirstPage />} />
                <Route path="/QuestionBox" element={<QuestionBox />} />
                <Route path="/ScoreTable" element={<ScoreTable />} />
                <Route path="/MainPlayerPage" element={<MainPlayerPage />} />
            </Routes>
        </Router>
    );
};

export default App;
