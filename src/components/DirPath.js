





import React from 'react'
import { Link } from 'react-router-dom';
import "./DirPath.css";

function DirPath(props) {
    return (
        <>
            <div className="d-flex dir justify-content-between mt-2 mb-1 ml-4">
                <div className="dir-path ml-4 pl-1">User</div>
                <div className="dir-buttons d-flex mr-5 pr-2">
                    <div className="dropdown">
                        <button className="dir-import btn btn-outline-secondary p-0 dropdown-toggle" type="button" id="dropdownMenuButtonUsers" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            import
                        </button>
                        <div className="dropdown-menu filter-dropdown3" aria-labelledby="dropdownMenuButton">
                            <label className="dropdown-text dis" disabled><p><b>Bulk Import</b></p></label>
                            <label className="dropdown-item"><p>Bulk Upload</p></label>
                            <label className="dropdown-item"><p>From Spread sheet</p></label>
                            <label className="dropdown-item"><p>CSV File</p></label>
                            <label className="dropdown-text dis pt-2" disabled><p><b>Bulk Update</b></p></label>
                            <label className="dropdown-item"><p>CSV File</p></label>
                        </div>
                    </div>
                    {/* <button className="dir-Add_user btn btn-outline-secondary p-0 mx-4">Add user</button> */}
                    <div className="dropdown">
                        <button className="dir-Add_user btn btn-outline-secondary p-0 mx-4 dropdown-toggle" type="button" id="dropdownMenuButtonUsers" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add user
                        </button>
                        <div className="dropdown-menu add-user-dir filter-dropdown3" aria-labelledby="dropdownMenuButton">
                            <Link to={{
                                pathname : `/addnew/${`student`}`,
                                linkData: "S"
                                }}><label className="dropdown-item" aria-disabled><p>Student</p></label></Link>
                            <Link to={{
                                pathname : `/addnew/${`employee`}`,
                                linkData: "E"
                                }}><label className="dropdown-item" aria-disabled><p>Employee</p></label></Link>
                            <Link to={{
                                pathname : `/addnew/${`parent`}`,
                                linkData: "P"
                                }}><label className="dropdown-item" aria-disabled><p>Parent</p></label></Link>
                        </div>
                    </div>
                    <button className="dir-dots btn btn-outline-secondary p-0 ml-2" style={{height: "2.7rem"}}>...</button>
                </div>
            </div>

        </>
    )
}

export default DirPath
