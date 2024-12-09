import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionBox from './Layout/Views/QuestionBox/QuestionBox';
import ScoreTable from './Layout/Views/ScoreTable/ScoreTable';
import MainPlayerPage from './Layout/Views/MainPlayerPage/MainPlayerPage';
import TarrahQuestionManagement from "./Layout/Views/TarrahQuestionManagement/TarrahQuestionManagement";
import TarrahMain from "./Layout/Views/TarrahMain/TarrahMain";
import TarrahCategoryManagement from "./Layout/Views/TarrahCategoryManagement/TarrahCategoryManagement";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/TarrahMainPage" element={<TarrahMain />} />
                <Route path="/PlayerMainPage" element={<MainPlayerPage />} />
                <Route path="/QuestionBox" element={<QuestionBox />} />
                <Route path="/ScoreTable" element={<ScoreTable />} />
                <Route path="/TarrahQuestionManagement" element={<TarrahQuestionManagement />} />
                <Route path="/TarrahCategoryManagement" element={<TarrahCategoryManagement />} />
            </Routes>
        </Router>

    );
};

export default App;