import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionBox from './Layout/Views/QuestionBox/QuestionBox';
import ScoreTable from './Layout/Views/ScoreTable/ScoreTable';
import MainPlayerPage from './Layout/Views/MainPlayerPage/MainPlayerPage';
import FirstPage from './Layout/Views/FirstPage/FirstPage';
import LoginPage from './Layout/Views/LoginPage/LoginPage';
import QuestionPage from './Layout/Views/QuestionPage/QuestionPage'; 
import TarrahQuestionManagement from "./Layout/Views/TarrahQuestionManagement/TarrahQuestionManagement";
import TarrahMain from "./Layout/Views/TarrahMain/TarrahMain";
import TarrahCategoryManagement from "./Layout/Views/TarrahCategoryManagement/TarrahCategoryManagement";
import Followings from "./Layout/Views/Followings/Followings";

const App = () => {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<FirstPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/QuestionPage" element={<QuestionPage />} /> 
                <Route path="/TarrahMainPage" element={<TarrahMain />} />
                <Route path="/PlayerMainPage" element={<MainPlayerPage />} />
                <Route path="/QuestionBox" element={<QuestionBox />} />
                <Route path="/ScoreTable" element={<ScoreTable />} />
                <Route path="/TarrahQuestionManagement" element={<TarrahQuestionManagement />} />
                <Route path="/TarrahCategoryManagement" element={<TarrahCategoryManagement />} />
                <Route path="/Followings" element={<Followings />} />
            </Routes>
        </Router>

    );
};

export default App;
