





import React from 'react'
import "./DirPath.css";

function DirPath(props) {
    return (
        <>
            <div className="d-flex dir justify-content-between mt-2 mb-1 ml-4">
                <div className="dir-path ml-4 pl-1">User</div>
                <div className="dir-buttons d-flex mr-5 pr-2">
                    <div className="dropdown">
                        <button className="dir-import btn btn-outline-secondary p-0 dropdown-toggle" style={{ verticalAlign: "top" }} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            import
                        </button>
                        <div className="dropdown-menu dir-import-menu" aria-labelledby="dropdownMenuButton">
                            <span className="dropdown-item dis" aria-disabled><b>Bulk Import</b></span>
                            <span className="dropdown-item">Bulk Upload</span>
                            <span className="dropdown-item">From Spread sheet</span>
                            <span className="dropdown-item">CSV File</span>
                            <span className="dropdown-item dis pt-2" aria-disabled><b>Bulk Update</b></span>
                            <span className="dropdown-item pb-3">CSV File</span>
                        </div>
                    </div>
                    <button className="dir-Add_user btn btn-outline-secondary p-0 mx-4">Add user</button>
                    <button className="dir-dots btn btn-outline-secondary p-0 ml-2" style={{height: "2.7rem"}}>...</button>
                </div>
            </div>

        </>
    )
}

export default DirPath
