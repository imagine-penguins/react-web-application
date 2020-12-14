




import React, { useState, useEffect } from 'react';

import "./FilterBar.css";
import FilterModel from './FilterModel';


function FilterBar(props) {

    // ...................................Filter toggle...........................................
    const [showFilters, setshowFilters] = useState(false);

    return (
        <>
            <div className="d-flex ml-5 pt-2 mt-3 justify-content-between">
                <div className="d-flex filter-text pl-1">
                    <div className="mr-2">Users</div>
                    {/* ......................Dropdown 1........................ */}
                    <div className="dropdown browse">
                        <button className="btn btn-sm browse-button btn-outline-none align-top p-0 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Browse
                        </button>
                        <div className="dropdown-menu filter-dropdown1">
                            <div className="d-flex">
                                <div className="col-4">
                                    <p className="dropdown-item text-dark" aria-disabled><b>User Type</b></p>
                                    <span className="d-flex">
                                        <input type="checkbox" name="student" value="Student" />
                                        <label className="dropdown-item" aria-disabled><p>Student</p></label>
                                    </span>
                                    <span className="d-flex">
                                        <input type="checkbox" name="teacher" value="Teacher" />
                                        <label className="dropdown-item" aria-disabled><p>Teacher</p></label>
                                    </span>
                                    <span className="d-flex">
                                        <input type="checkbox" name="admin" value="Admin" />
                                        <label className="dropdown-item" aria-disabled><p>Admin</p></label>
                                    </span>
                                    <span className="d-flex">
                                        <input type="checkbox" name="parent" value="Parent" />
                                        <label className="dropdown-item" aria-disabled><p>Parent</p></label>
                                    </span>
                                </div>
                                <div className="col-4 pl-0 pb-5 mb-3">
                                    <p className="dropdown-item text-dark" aria-disabled><b>Department</b></p>
                                    <span className="d-flex">
                                        <input type="checkbox" name="botany" value="Botany" />
                                        <label className="dropdown-item" aria-disabled><p>Botany</p></label>
                                    </span>
                                    <span className="d-flex">
                                        <input type="checkbox" name="chemistry" value="Chemistry" />
                                        <label className="dropdown-item" aria-disabled><p>Chemistry</p></label>
                                    </span>
                                    <span className="d-flex">
                                        <input type="checkbox" name="zoology" value="Zoology" />
                                        <label className="dropdown-item" aria-disabled><p>Zoology</p></label>
                                    </span>
                                    <span className="d-flex">
                                        <input type="checkbox" name="PMCS" value="PMCS" />
                                        <label className="dropdown-item" aria-disabled><p>PMCS</p></label>
                                    </span>
                                    <span className="d-flex">
                                        <input type="checkbox" name="biochemistry" value="Biochemistry" />
                                        <label className="dropdown-item" aria-disabled><p>Biochemistry</p></label>
                                    </span>
                                    <span className="d-flex">
                                        <input type="checkbox" name="biotechnology" value="Biotechnology" className="error-check-box" />
                                        <label className="dropdown-item" aria-disabled><p>Biotechnology</p></label>
                                    </span>
                                    <span className="d-flex">
                                        <input type="checkbox" name="physics" value="Physics" />
                                        <label className="dropdown-item" aria-disabled><p>Physics</p></label>
                                    </span>
                                    
                                </div>
                                <div className="col-4 pr-5 pl-1">
                                    <p className="dropdown-item text-dark" aria-disabled><b>User Role</b></p>
                                    <span className="d-flex">
                                        <input type="checkbox" name="a" value="b" />
                                        <label className="dropdown-item" aria-disabled><p>Student</p></label>
                                    </span>
                                    <span className="d-flex">
                                        <input type="checkbox" name="a" value="b" />
                                        <label className="dropdown-item" aria-disabled><p>PGT Eng</p></label>
                                    </span>
                                    <span className="d-flex">
                                        <input type="checkbox" name="a" value="b" />
                                        <label className="dropdown-item" aria-disabled><p>TGT Bio</p></label>
                                    </span>
                                    <span className="d-flex">
                                        <input type="checkbox" name="a" value="b" />
                                        <label className="dropdown-item" aria-disabled><p>Tgt Maths</p></label>
                                    </span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="d-flex filter-text ml-5">
                    <div className="ml-1 mr-2">Sort by</div>
                    {/* ......................Dropdown 2........................ */}
                    <div className="dropdown">
                        <button className="btn btn-sm btn-outline-none p-0 align-top dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            User Type
                        </button>
                        <div className="dropdown-menu user-type-dropdown" aria-labelledby="dropdownMenuButton">
                            <label className="dropdown-item" aria-disabled><p>First Name</p></label>
                            <label className="dropdown-item" aria-disabled><p>Last Name</p></label>
                            <label className="dropdown-item" aria-disabled><p>Roll No</p></label>
                            <label className="dropdown-item" aria-disabled><p>Section</p></label>
                            <label className="dropdown-item mt-4" aria-disabled><p>Ascending</p></label>
                            <label className="dropdown-item pb-3" aria-disabled><p>decending</p></label>
                        </div>
                    </div>
                </div>
                {/* .......................Search Icon.............................. */}
                <div className="form-group filter-search mb-0 mr-0">
                    <span className="fa fa-search search-icon"></span>
                    <input type="text" className="form-control" placeholder="Search User" style={{ fontSize: "1.4rem" }} />
                </div>
                {/* .......................Paginations.............................. */}
                <div className="d-flex pagination mr-5">
                    <div className="pagination-text mr-4 mt-1">1 to 6 of 6</div>
                    <button className="btn btn-sm btn-outline-secondary pagination-button bg-white ml-4"><i className="fa fa-chevron-left pagination-i"></i></button>
                    <button className="btn btn-sm btn-outline-secondary pagination-button bg-white"><i className="fa fa-chevron-right pagination-i"></i></button>

                {/* .......................List/Grid view Icon.............................. */}
                {props.hideGridView? <div className="mr-5 pr-3"></div>
                :
                    <span className="list-grid mr-4">
                        {
                        props.listOrGrid ? 
                        <i className="fa fa-th ml-4" onClick={props.toogleListGrid} style={{ fontSize: "2.8rem", cursor: "pointer" }}></i>
                        :
                        <i className="fas fa-list ml-4" onClick={props.toogleListGrid} style={{ fontSize: "2.5rem", cursor: "pointer" }}></i>
                        }
                    </span>
                }

                {/* .......................Filter Icons.............................. */}
                    <i className="fas fa-filter mr-2" onClick={() => setshowFilters(true)} style={{ position: "inherit", fontSize: "2.5rem", cursor: "pointer" }}></i>
                
                {/* .......................Filter model.............................. */}
                    <FilterModel show={showFilters} hide={() => setshowFilters(false)} />

                </div>

            </div>


        </>
    )
}

export default FilterBar
