




import React from 'react';
import "./UserProfileRight.css";

function UserProfileRight() {
    return (
        <>

            <div className="User-Detailed-Profile pt-3 mt-2 ml-4 bg-white">

                <button className="User-Detailed-Profile-button">Genral Information</button>
                <button className="User-Detailed-Profile-button ml-3">Personal Information</button>
                <button className="User-Detailed-Profile-button ml-3">Academics Information</button>

                {/* .........................Personal Details..................................... */}
                <div className="d-flex pt-3 mt-4">
                    <p className="User-Detailed-Profile-name" style={{ width :"31rem" }}>First Name</p>
                    <p className="User-Detailed-Profile-name">Middle Name</p>
                </div>
                <div className="d-flex pt-2">
                    <p className="User-Detailed-Profile-text" style={{ width :"31rem" }}>Gautam</p>
                    <p className="User-Detailed-Profile-text">---</p>
                </div>

                <div className="d-flex mt-3 pt-3"><p className="User-Detailed-Profile-name">Last Name</p></div>
                <div className="d-flex pt-2"><p className="User-Detailed-Profile-text">Kumar</p></div>
                
                {/* .........................Contact Details..................................... */}
                <div className="d-flex pt-2 mt-3"><p className="User-Detailed-Profile-heading">Contact Details</p></div>

                <div className="d-flex pt-2">
                    <p className="User-Detailed-Profile-name" style={{ width :"31rem" }}>Official Email</p>
                    <p className="User-Detailed-Profile-name">Phone No</p>
                </div>
                <div className="d-flex pt-2">
                    <p className="User-Detailed-Profile-text" style={{ width :"31rem" }}>jangragautam98@gmail.com</p>
                    <p className="User-Detailed-Profile-text">9987655575</p>
                </div>

                <div className="d-flex mt-4 pt-2"><p className="User-Detailed-Profile-name">Address</p></div>
                <div className="d-flex pt-2"><p className="User-Detailed-Profile-text">D-74, City, Delhi</p></div>

                {/* .........................Reporting Information..................................... */}
                <div className="d-flex pt-2 mt-4"><p className="User-Detailed-Profile-heading">Reporting Information</p></div>
                <div className="d-flex pt-3"><p className="User-Detailed-Profile-name">Reporting Manager</p></div>
                <div className="d-flex"><p className="User-Detailed-Profile-text">Mayank Kumar</p></div>
                <div className="d-flex mt-3 pt-3"><p className="User-Detailed-Profile-name">Reporting Manager of Reporting Manager</p></div>
                <div className="d-flex"><p className="User-Detailed-Profile-text">ABC</p></div>

            </div>

        </>
    )
}

export default UserProfileRight
