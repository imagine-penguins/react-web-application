





import React from 'react';
import "./AddNewUserGenralInfo.css";


function AddNewUserGenralInfo() {
    return (
        <>

            <div className="input-width">

                {/* .........................Personal Details..................................... */}
                <div className="d-flex pt-4 ml-2">
                    <input className="Add-New-input mr-5 pr-5" placeholder="First Name" />
                    <input className="Add-New-input pl-5 ml-5" placeholder="Middle Name" />
                </div>

                <div className="d-flex pt-1 ml-2"><input className="Add-New-input" placeholder="Last Name" />  </div>


                {/* .........................Contact Details..................................... */}
                <div className="d-flex pt-2 mt-5"><p className="Add-New-genral-heading">Contact Details</p></div>

                <div className="d-flex pt-1 ml-2">
                    <input className="Add-New-input mr-5 pr-5" placeholder="Oficial Email" />
                    <input className="Add-New-input ml-5 pl-5" placeholder="Phone No." />
                </div>

                <div className="d-flex pt-1 ml-2"><input className="Add-New-input" placeholder="Address" /></div>

                {/* .........................Reporting Information..................................... */}
                <div className="d-flex pt-2 mt-5"><p className="Add-New-genral-heading">Reporting Information</p></div>
                <div className="d-flex pt-1 ml-2">
                    <input className="Add-New-input mr-5 pr-5" placeholder="Reporting Manager" />
                    <input className="Add-New-input ml-5 pl-5" placeholder="Reporting Manager of Reporting Manager" />
                </div>

                {/* .........................System Information..................................... */}
                <div className="d-flex pt-2 mt-5"><p className="Add-New-genral-heading">System Information</p></div>
                <div className="d-flex pt-1 ml-2"><input className="Add-New-input" placeholder="User ID" /></div>
                <div className="d-flex pt-1 ml-2"><input className="Add-New-input" placeholder="User Status" /></div>
                <div className="d-flex pt-1 ml-2"><input className="Add-New-input" placeholder="User Type" /></div>

                <div className="d-flex pt-1 justify-content-end mt-5 pt-4 mr-5 pr-5">
                    <button className="Add-New-input-button-cencel">Cencel</button>
                    <button className="Add-New-input-button-save ml-3 mr-5">Save &amp; Next</button>
                </div>

            </div>
            
        </>
    )
}

export default AddNewUserGenralInfo
