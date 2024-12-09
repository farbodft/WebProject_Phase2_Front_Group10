import React from 'react';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import RankingTable from "../../Components/RankingTable/RankingTable";
const ScoreTable = () => {
    return (
        <div>
            <Navbar usage={"Player"}/>
            <RankingTable/>
            <Footer/>
        </div>
    );
};

export default ScoreTable;
