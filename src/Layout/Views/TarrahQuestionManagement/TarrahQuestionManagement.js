import React from 'react';
import List from "../../Components/ExistingsList/List";
import AddQuestion from "../../Components/QuestionAdding/AddQuestion";

const TarrahQuestionManagement = () => {
    return (
        <div>
            {/*<Navbar/>*/}
            <div className={'container'}>
                <AddQuestion />
                <List usage="Questions" />
            </div>
            {/*<Footer/>*/}
        </div>
    );
}

export default TarrahQuestionManagement;
