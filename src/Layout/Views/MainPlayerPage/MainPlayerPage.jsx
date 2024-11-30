import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import './MainPlayerPage.css';

const MainPlayerPage = () => {
    return (
        <div>
            <Navbar/>
            <ProfileCard/>
            <Footer/>
        </div>
    );
};

export default MainPlayerPage;
