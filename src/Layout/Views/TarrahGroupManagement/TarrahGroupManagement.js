import React from 'react';
import List from "../../Components/ExistingsList/List";
import AddGroup from "../../Components/GroupAdding/AddGroup";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const TarrahGroupManagement = () => {
    return (
        <div>
            <Navbar usage={"Tarrah"}/>
            <div className={'container'}>
                <AddGroup />
                <List usage="Groups" />
            </div>
            <Footer/>
        </div>
    );
}

export default TarrahGroupManagement;
