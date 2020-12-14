





import React, {useState} from 'react';
import "./AddNew.css";
import "../UserProfile/UserProfileRight.css";
import AddNewPersonalInfo from './AddNewPersonalInfo';
import AddNewUserGenralInfo from './AddNewUserGenralInfo';

function AddNew() {

    const [genralInfo, setgenralInfo] = useState(true);

    return (
        <>
            {/* ........................................To show Path............................................... */}
            <div className="d-flex text-secondary pl-2 ml-4" style={{ fontSize: "1.3rem" }}>
                {`Users > Add New`}
            </div>

            <div className="add-new pt-3 pl-1 ml-4">
                <button className="User-Detailed-Profile-button ml-1" onClick={() => setgenralInfo(true)}>Genral Information</button>
                <button className="User-Detailed-Profile-button ml-3" onClick={() => setgenralInfo(false)}>Personal Information</button>
            
                <hr />

                {genralInfo ? <AddNewUserGenralInfo /> : <AddNewPersonalInfo /> }

            </div>
            
        </>
    )
}

export default AddNew
