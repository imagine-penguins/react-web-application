




import React from 'react';
import "./PersonalInfoProfile.css";

function PersonalInfoProfile(props) {

    console.log("props.data inside PersonalInfoProfile:", props.data);


    return (
        <>
            {/* .........................Personal Details..................................... */}
            <div className="d-flex pt-3 mt-4">
                <p className="User-Detailed-Profile-name" style={{ width :"31rem" }}>Gender</p>
                <p className="User-Detailed-Profile-name">Blood Group</p>
            </div>
            <div className="d-flex pt-2">
                <p className="User-Detailed-Profile-text" style={{ width :"31rem" }}>{props.data ? props.data.personalInformation.gender ? props.data.personalInformation.gender : `---` : `---`}</p>
                <p className="User-Detailed-Profile-text">{props.data ? props.data.personalInformation.bloodGroup ? props.data.personalInformation.bloodGroup : `---` : `---` }</p>
            </div>

            <div className="d-flex mt-3 pt-3"><p className="User-Detailed-Profile-name">D.O.B</p></div>
            <div className="d-flex pt-2"><p className="User-Detailed-Profile-text">{props.data ? props.data.personalInformation.dob ? props.data.personalInformation.dob : `---` : `---`}</p></div>
            {/* .........................Home Address..................................... */}
            <div className="d-flex pt-2 mt-3"><p className="User-Detailed-Profile-heading">Contact Details</p></div>

            <div className="d-flex pt-2">
                <p className="User-Detailed-Profile-name" style={{ width :"31rem" }}>Alternate Email</p>
                <p className="User-Detailed-Profile-name">Alternate Phone No</p>
            </div>
            <div className="d-flex pt-2">
                <p className="User-Detailed-Profile-text" style={{ width :"31rem" }}>{props.data ? props.data.generalInformation.contactDTO.alternateEmail ? props.data.generalInformation.contactDTO.alternateEmail : `---` : `---`}</p>
                <p className="User-Detailed-Profile-text">{props.data ? props.data.generalInformation.contactDTO.alternatePhone ? props.data.generalInformation.contactDTO.alternatePhone : `---` : `---`}</p>
            </div>

            <div className="d-flex mt-4 pt-2"><p className="User-Detailed-Profile-name">Home Address</p></div>
            <div className="d-flex pt-2"><p className="User-Detailed-Profile-text">{props.data ? props.data.personalInformation.homeAddress ? (props.data.personalInformation.homeAddress.line1 + ", " + props.data.personalInformation.homeAddress.line2 + ", " + props.data.personalInformation.homeAddress.state + ", " + props.data.personalInformation.homeAddress.country) : `---` : `---`}</p></div>

            {/* .........................Guardian's Information..................................... */}
            <div className="d-flex pt-2 mt-4"><p className="User-Detailed-Profile-heading">Guardian's Information</p></div>
            
            <div className="d-flex pt-2">
                <p className="User-Detailed-Profile-name" style={{ width :"31rem" }}>Guardian's Name</p>
                <p className="User-Detailed-Profile-name">Guardian's Relation</p>
            </div>
            <div className="d-flex pt-2">
                <p className="User-Detailed-Profile-text" style={{ width :"31rem" }}>{props.data ? props.data.personalInformation.guardianName ? props.data.personalInformation.guardianName : `---` : `---`}</p>
                <p className="User-Detailed-Profile-text">{props.data ? props.data.personalInformation.guardianRelation ? props.data.personalInformation.guardianRelation : `---` : `---`}</p>
            </div>

            <div className="d-flex mt-4 pt-2"><p className="User-Detailed-Profile-name">Guardian's Phone No.</p></div>
            <div className="d-flex pt-2"><p className="User-Detailed-Profile-text pb-5">{props.data ? props.data.personalInformation.guardianMobileNo ? props.data.personalInformation.guardianMobileNo : `---` : `---`}</p></div>
        </>
    )
}

export default PersonalInfoProfile
