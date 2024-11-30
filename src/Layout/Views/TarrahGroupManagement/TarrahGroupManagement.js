import React from 'react';
import List from "../../Components/ExistingsList/List";
import AddGroup from "../../Components/GroupAdding/AddGroup";

const TarrahGroupManagement = () => {
    return (
        <div>
            {/*<Navbar/>*/}
            <div className={'container'}>
                <AddGroup />
                <List usage="Groups" />
            </div>
            {/*<Footer/>*/}
        </div>
    );
}

export default TarrahGroupManagement;
