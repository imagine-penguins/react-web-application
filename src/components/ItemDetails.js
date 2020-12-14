





import React, { useState } from 'react';
import "./ItemDetails.css"


function ItemDetails() {

    const [checkAll, setcheckAll] = useState("")

    function checkAllUsers() {
        if (checkAll) {
            setcheckAll("");
        }
        else {
            setcheckAll("checked");
        }
    }


    return (
        <>
            <div className="d-flex item-details mt-4 mb-3 bg-white">
                <div className="col-lg-3">
                    <form className="Form d-flex pt-2">
                        <input type="checkbox" className="item-detail-checkbox mr-3 ml-1" />
                        <label> Users</label>
                    </form>
                </div>
                <div className="col-lg-3 col-md-2 col-sm-2">
                    <p className="pt-2">Contact</p>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2">
                    <p className="pt-2 ml-4">User Type</p>
                </div>
                <div className="col-lg-4 col-md-2 col-sm-2">
                    <p className="pt-2 pl-4 ml-5">User Status</p>
                </div>
            </div>
        </>
    )
}

export default ItemDetails
