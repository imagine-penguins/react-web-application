




import React, { useState } from 'react';
import AcademicsInfoProfile from './AcademicsInfoProfile';
import GenralInfoProfile from './GenralInfoProfile';
import PersonalInfoProfile from './PersonalInfoProfile';
import "./UserProfileRight.css";

function UserProfileRight(props) {

    const [genralInfo, setgenralInfo] = useState(true);
    const [personalInfo, setpersonalInfo] = useState(false);
    const [academicsInfo, setacademicsInfo] = useState(false);
    
    console.log("props.data in UserProfileRight:", props.data);

    return (
        <>

            <div className="User-Detailed-Profile pt-3 mt-2 ml-4 bg-white">

                <button className={`User-Detailed-Profile-button ${genralInfo && `focusCss`}`} onClick={(e) => {setgenralInfo(true);setpersonalInfo(false);setacademicsInfo(false);props.changes("Genral Information");}}>Genral Information</button>
                <button className={`User-Detailed-Profile-button ml-3 ${personalInfo && `focusCss`}`} onClick={() => {setgenralInfo(false);setpersonalInfo(true);setacademicsInfo(false);props.changes("Personal Information");}}>Personal Information</button>
                {props.data.userType === "S" && <button className={`User-Detailed-Profile-button ml-3 ${academicsInfo && `focusCss`}`} onClick={() => {setgenralInfo(false);setpersonalInfo(false);setacademicsInfo(true);props.changes("Academics Information");}}>Academics Information</button>}
                
                {console.log("genralInfo, personalInfo, academicsInfo inside UserProfileRight:", genralInfo, personalInfo, academicsInfo, props.data)}

                {academicsInfo && <AcademicsInfoProfile data={props.data} />}
                {personalInfo && <PersonalInfoProfile data={props.data} />}
                {genralInfo && <GenralInfoProfile data={props.data} />}

            </div>

        </>
    )
}

export default UserProfileRight
