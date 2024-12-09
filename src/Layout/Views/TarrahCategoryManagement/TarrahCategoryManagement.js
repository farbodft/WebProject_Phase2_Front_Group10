import React from 'react';
import List from "../../Components/ExistingsList/List";
import AddCategory from "../../Components/CategoryAdding/AddCategory";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const TarrahCategoryManagement = () => {
    return (
        <div>
            <Navbar usage={"Tarrah"}/>
            <div className={'container'}>
                <AddCategory />
                <List usage="Groups" />
            </div>
            <Footer/>
        </div>
    );
}

export default TarrahCategoryManagement;
