




import React from 'react';
import "./GenralInfoProfile.css";

function GenralInfoProfile(props) {

    const userProfile = props.data.length === 0 ? false : true;
    console.log("props.data inside GenralInfoProfile:", userProfile, props.data);


    return (
        <>

            {/* .........................Personal Details..................................... */}
            <div className="d-flex pt-3 mt-4">
                <p className="User-Detailed-Profile-name" style={{ width :"31rem" }}>First Name</p>
                <p className="User-Detailed-Profile-name">Middle Name</p>
            </div>
            <div className="d-flex pt-2">
                <p className="User-Detailed-Profile-text" style={{ width :"31rem" }}>{userProfile ? props.data.generalInformation.firstName ? props.data.generalInformation.firstName : `---` : `---`}</p>
                <p className="User-Detailed-Profile-text">{userProfile ? props.data.generalInformation.middleName ? props.data.generalInformation.middleName : `---` : `---` }</p>
            </div>

            <div className="d-flex mt-3 pt-3"><p className="User-Detailed-Profile-name">Last Name</p></div>
            <div className="d-flex pt-2"><p className="User-Detailed-Profile-text">{userProfile ? props.data.generalInformation.lastName ? props.data.generalInformation.lastName : `---` : `---`}</p></div>
            
            {/* .........................Contact Details..................................... */}
            <div className="d-flex pt-2 mt-3"><p className="User-Detailed-Profile-heading">Contact Details</p></div>

            <div className="d-flex pt-2">
                <p className="User-Detailed-Profile-name" style={{ width :"31rem" }}>Official Email</p>
                <p className="User-Detailed-Profile-name">Phone No</p>
            </div>
            <div className="d-flex pt-2">
                <p className="User-Detailed-Profile-text" style={{ width :"31rem" }}>{userProfile ? props.data.generalInformation.contactDTO.email ? props.data.generalInformation.contactDTO.email : `---` : `---`}</p>
                <p className="User-Detailed-Profile-text">{userProfile ? props.data.generalInformation.contactDTO.phone ? props.data.generalInformation.contactDTO.phone : `---` : `---`}</p>
            </div>

            <div className="d-flex mt-4 pt-2"><p className="User-Detailed-Profile-name">Address</p></div>
            <div className="d-flex pt-2"><p className="User-Detailed-Profile-text">{userProfile ? props.data.generalInformation.communicationAddress ? (props.data.generalInformation.communicationAddress.line1 + ", " + props.data.generalInformation.communicationAddress.line2 + ", " + props.data.generalInformation.communicationAddress.state + ", " + props.data.generalInformation.communicationAddress.country) : `---` : `---`}</p></div>

            {/* .........................Reporting Information..................................... */}
            <div className="d-flex pt-2 mt-4"><p className="User-Detailed-Profile-heading">Reporting Information</p></div>
            <div className="d-flex pt-3"><p className="User-Detailed-Profile-name">Reporting Manager</p></div>
            <div className="d-flex pt-2"><p className="User-Detailed-Profile-text pb-5">{userProfile ? props.data.generalInformation.reportingManagerName ? props.data.generalInformation.reportingManagerName : `---` : `---`}</p></div>

        </>
    )
}

export default GenralInfoProfile
