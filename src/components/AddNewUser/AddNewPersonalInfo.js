




import React from 'react';
import "./AddNewPersonalInfo.css";

function AddNewPersonalInfo() {
    return (
        <>
            <div className="Add-New pt-4 pl-1">

                {/* .........................System Information..................................... */}
                <div className="d-flex"><p className="Add-New-personal-heading mt-0">User Profile</p></div>
                <div className="d-flex pt-1 ml-2">
                    <p className="Add-New-text ml-4">( For System )</p>
                    <p className="Add-New-text">( For Office Work, Passport Size )</p>
                </div>
                <div className="d-flex pt-1 ml-2">
                    <i class="fas fa-upload"></i>
                    <i class="fas fa-user-circle"></i>
                    <i class="fas fa-upload"></i>
                    <i class="fas fa-user-circle ml-5 pl-5"></i>
                </div>


                <div className="d-flex pt-1 mb-4 ml-2"><input className="Add-New-input" placeholder="Display Name" /></div>
                <div className="d-flex pt-1 ml-2">
                    <input className="Add-New-input mr-5" placeholder="Gnder" />
                    <input className="Add-New-input ml-5 pl-5" placeholder="Blood Grop" />
                </div>
                <div className="d-flex pt-1 ml-2"><input className="Add-New-input" placeholder="DOB" /></div>

                {/* .........................System Information..................................... */}
                <div className="d-flex pt-1"><p className="Add-New-personal-heading">Home Address</p></div>
                <div className="d-flex pt-1 ml-2"><input className="Add-New-input" placeholder="Street" /></div>
                <div className="d-flex pt-1 ml-2"><input className="Add-New-input" placeholder="City" /></div>
                <div className="d-flex pt-1 ml-2"><input className="Add-New-input" placeholder="Pin" /></div>
                <div className="d-flex pt-1 ml-2"><input className="Add-New-input" placeholder="State" /></div>

                {/* .........................System Information..................................... */}
                <div className="d-flex pt-1"><p className="Add-New-personal-heading">Gardian Information</p></div>
                <div className="d-flex pt-1 ml-2"><input className="Add-New-input" placeholder="Name" /></div>
                <div className="d-flex pt-1 ml-2"><input className="Add-New-input" placeholder="Relation" /></div>
                <div className="d-flex pt-1 ml-2"><input className="Add-New-input" placeholder="Mobile No." /></div>

                <div className="d-flex pt-1 justify-content-end mt-5 pt-4 mr-5 pr-5">
                    <button className="Add-New-input-button-cencel">Cencel</button>
                    <button className="Add-New-input-button-save ml-3 mr-5">Save &amp; Next</button>
                </div>

            </div>
        </>
    )
}

export default AddNewPersonalInfo
