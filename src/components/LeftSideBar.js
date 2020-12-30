




import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./LeftSideBar.css";

function LeftSideBar(props) {

    const [focusCss, setfocusCss] = useState({
        home: "",
        users: "",
        calander: "",
        attandance: "",
    });

    return (
        <>
            <div className="left">
                <ul id="leftNavIcon">

                    {/* <!--........................Home.............................--> */}
                    <li><i className={`fa fa-home ${focusCss.home}`} style={{ marginTop: "4.5rem", fontSize: "3rem" }} onClick={() => setfocusCss({ home: "focusNow" })}></i></li>

                    {/* <!--........................User.............................--> */}
                    <li className="attandance-dropdown d-flex">
                        <Link to="/users/users-list"><i className={`fas fa-user-friends ${focusCss.users}`} onClick={() => setfocusCss({ users: "focusNow" })}></i></Link>
                        <div className="attandance-dropdown-content mt-2 pl-2" style={{ fontSize: "1.6rem", width: "21rem", height: "15rem" }}>
                            <p>Users</p>
                            {/* ..................Users List.............. */}
                            <div onClick={() => setfocusCss({ users: "focusNow" })}>
                                <div className="d-flex">
                                    <i className="fas fa-user-friends ml-4 mr-3"></i>
                                    <Link to="/users/users-list"><p>Users</p></Link>
                                </div>
                                {/* ..................Hierarchy................ */}
                                <div className="d-flex">
                                    <i className="fas fa-sitemap ml-4 mr-3"></i>
                                    <Link to="/users/hierarchy"><p>Hierarchy chart</p></Link>
                                </div>
                            </div>
                        </div>
                    </li>

                    {/* <!--........................Calander.............................--> */}
                    <li><i className={`fa fa-calendar-o ${focusCss.calander}`} onClick={() => setfocusCss({ calander: "focusNow" })}></i></li>

                    {/* <!--........................Attandance.............................--> */}
                    <li className="attandance-dropdown d-flex">
                        <Link to="/attandance/take-attandance"><i className={`fas fa-user-check attandance-dropbtn ${focusCss.attandance}`} onClick={() => setfocusCss({ attandance: "focusNow" })}></i></Link>
                        <div className="attandance-dropdown-content mt-2 pl-2" style={{ fontSize: "1.6rem" }}>
                            <p>Attandance</p>

                            {/* ...........Take Attandance............ */}
                            <div onClick={() => setfocusCss({ attandance: "focusNow" })}>
                                <div className="d-flex pt-1">
                                    <i className="fas fa-user-friends ml-4 mr-3"></i>
                                    <Link to="/attandance/take-attandance"><p>Take attandance</p></Link>
                                </div>
                                <div className="d-flex mt-1">
                                    <i className="fas fa-user-plus ml-4 mr-3"></i>
                                    <Link to="/attandance/leave-request"><p>Leave request</p></Link>
                                </div>
                                <div className="d-flex mt-1">
                                    <i className="fas fa-history ml-4 mr-3"></i>
                                    <Link to="/attandance/history"><p>Attandance History</p></Link>
                                </div>
                            </div>
                        </div>
                    </li>


                </ul>
            </div>
        </>
    )
}

export default LeftSideBar
