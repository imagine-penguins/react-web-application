




import React, { useState } from 'react';
import Modal from "react-modal";
import "./FilterModel.css";
import enums from "./enums";

Modal.setAppElement("#root")

function FilterModel(props) {


    const [mainFilterQuery, setmainFilterQuery] = useState("");
    const [userType, setuserType] = useState("");
    const [roll, setroll] = useState("");
    const [status, setstatus] = useState("");


    const handelApplyFilters = () => {
        console.log("userType, roll, status :", userType, roll, status);
        let query = `&search=userType:${userType},roll:${roll},status:${status}`;
        // setmainFilterQuery(query);

        props.query(query);
        props.hide();
    }


    return (
        <Modal
            id="filterModel"
            isOpen={props.show}
            onRequestClose={props.hide}
            style={
                {
                    content: {
                        left: 'auto',
                        right: "4rem",
                        top: "15rem",
                    }
                }
            }
        >   
            <div className="">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-lg cross-button mb-4 btn-outline-none" onClick={props.hide}>&times;</button>
                </div>
                <div className="inside-filter" id="apply-filter">

                    {/* ............User Type................ */}
                    <label className="label-input-filter-main">User Type</label>
                    <input className="Add-New-input" type="text" list="userType" name="user-type" placeholder="User Type" value={userType} onChange={(e) => setuserType(e.target.value)} />
                    <datalist id="userType">
                        { props.allFilters.userTypes && props.allFilters.userTypes.map((data, index) => (
                            <>
                                <option key={index + "u"} value={data}>{enums[data].toLowerCase()}</option>
                            </>
                        ))}
                    </datalist>

                    {/* ............Roles................ */}
                    <label className="label-input-filter-main">Rolls</label>
                    <input className="Add-New-input" type="text" list="userRole" name="user-role" placeholder="User Role" value={roll} onChange={(e) => setroll(e.target.value)} />
                    <datalist id="userRole">
                        {props.allFilters.roles && props.allFilters.roles.map((data, index) => (
                            <>
                                <option key={index + "r"} value={data.id}>{data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase()}</option>
                            </>
                        ))}
                    </datalist>

                    {/* ............Status................ */}
                    <label className="label-input-filter-main">Status</label>
                    <select className="Add-New-input filter-model-main" type="text" value={status} onChange={(e) => setstatus(e.target.value)}>
                        <option key={"**"} value="">--Select Status--</option>
                        <option key={"act"} value={"P"}>Present</option>
                        <option key={"inact"} value={"A"}>Absent</option>
                        <option key={"inact"} value={"L"}>Leave</option>
                        <option key={"inact"} value={true}>Active</option>
                        <option key={"inact"} value={false}>Inactive</option>
                    </select>

                    {/* ............Button for Apply................ */}
                    <button type="submit" className="btn btn-dark mt-3" onClick={handelApplyFilters} >Apply Filters</button>
                </div>
            </div>
        </Modal>
    )
}

export default FilterModel
