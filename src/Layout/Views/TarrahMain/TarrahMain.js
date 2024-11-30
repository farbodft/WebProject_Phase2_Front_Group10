import React from 'react';
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const TarrahMain = () => {
    return (
        <div>
            <Navbar usage={"Tarrah"}/>
            <ProfileCard usage={"Tarrah"}/>
            <Footer/>
        </div>
    );
}

export default TarrahMain;
