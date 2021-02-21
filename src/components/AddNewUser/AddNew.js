





import React, {useEffect, useState} from 'react';
import "./AddNew.css";
import "../UserProfile/UserProfileRight.css";
import AddNewPersonalInfo from './AddNewPersonalInfo';
import AddNewUserGenralInfo from './AddNewUserGenralInfo';
import { withRouter } from "react-router-dom";
import ToShowTopPath from '../ToShowTopPath';
import enums from '../enums';

function AddNew(props) {

    const [genralInfo, setgenralInfo] = useState(true);
    const [genralInfoData, setgenralInfoData] = useState({});
    const [userType, setuserType] = useState(
        props.location.pathname.includes("student") ? "S"
        : props.location.pathname.includes("employee") ? "E"
        : "P");


    console.log("userType inside addNew(parent):", userType);

    return (
        <>
            {/* ........................................To show Path............................................... */}
            <ToShowTopPath path={`User / Add New / ${enums[userType]} / ${genralInfo ? `Genral Information` : `Personal Information`}`} />

            <div className="add-new pt-3 pl-1 ml-4">
                <button className={`User-Detailed-Profile-button ml-1 ${genralInfo === true ? `focus` : ` `}`} onClick={() => setgenralInfo(true)}>Genral Information</button>
                <button className={`User-Detailed-Profile-button ml-3  ${genralInfo === false ? `focus` : ` `}`} onClick={() => setgenralInfo(false)}>Personal Information</button>
            
                <hr />

                {genralInfo ? <AddNewUserGenralInfo userType={userType} switch={(data) => {setgenralInfo(false);setgenralInfoData(data)}} /> : <AddNewPersonalInfo userType={userType} genralData={genralInfoData} /> }

            </div>
            
        </>
    )
}

export default withRouter(AddNew)
