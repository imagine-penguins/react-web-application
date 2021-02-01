




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
                        <div className="attandance-dropdown-content drop-users mt-2 pl-2" style={{ fontSize: "1.6rem", width: "21rem", height: "15rem" }}>
                            <p>Users</p>
                            {/* ..................Users List.............. */}
                            <div onClick={() => setfocusCss({ users: "focusNow" })}>
                                <Link to="/users/users-list">
                                    <div tabIndex="100" className="d-flex drop">
                                        <i className="fas fa-user-friends ml-2 mr-3"></i>
                                        <p>Users</p>
                                    </div>
                                </Link>
                                {/* ..................Hierarchy................ */}
                                <Link to="/users/hierarchy">
                                    <div tabIndex="101" className="d-flex drop mt-1">
                                        <i className="fas fa-sitemap ml-2 mr-3"></i>
                                        <p>Hierarchy chart</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </li>

                    {/* <!--........................Calander.............................--> */}
                    <li><i className={`fa fa-calendar-o ${focusCss.calander}`} onClick={() => setfocusCss({ calander: "focusNow" })}></i></li>

                    {/* <!--........................Attandance.............................--> */}
                    <li className="attandance-dropdown d-flex">
                        <Link to="/attandance/take-attandance"><i className={`fas fa-user-check attandance-dropbtn ${focusCss.attandance}`} onClick={() => setfocusCss({ attandance: "focusNow" })}></i></Link>
                        <div className="attandance-dropdown-content drop-attadance mt-2 pl-2" style={{ fontSize: "1.6rem" }}>
                            <p>Attandance</p>

                            {/* ...........Take Attandance............ */}
                            <div onClick={() => setfocusCss({ attandance: "focusNow" })}>
                                <Link to="/attandance/take-attandance">
                                    <div tabIndex="103" className="d-flex drop pt-1">
                                        <i className="fas fa-user-friends ml-2 mr-3"></i>
                                        <p>Take attandance</p>
                                    </div>
                                </Link>
                                <Link to="/attandance/leave-request">
                                    <div tabIndex="104" className="d-flex drop mt-1">
                                        <i className="fas fa-user-plus ml-2 mr-3"></i>
                                        <p>Leave request</p>
                                    </div>
                                </Link>
                                <Link to="/attandance/history">
                                    <div tabIndex="105" className="d-flex drop mt-1">
                                        <i className="fas fa-history ml-2 mr-3"></i>
                                        <p>Attandance History</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </li>


                </ul>
            </div>
        </>
    )
}

export default LeftSideBar
