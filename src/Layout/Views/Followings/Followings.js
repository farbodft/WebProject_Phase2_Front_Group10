import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import FollowedDesigners from "../../Components/FollowedDesigners/FollowedDesigners";


const MainPlayerPage = () => {
    return (
        <div>
            <Navbar usage={"Player"}/>
            <FollowedDesigners usage={"Player"}/>
            <Footer/>
        </div>
    );
};

export default MainPlayerPage;
