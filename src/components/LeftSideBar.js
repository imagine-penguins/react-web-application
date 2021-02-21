




import React, { useState } from 'react';
import { Link } from "react-router-dom";
import setActiveClass from './ActiveCss';
import "./LeftSideBar.css";

function LeftSideBar(props) {

    const [focusCss, setfocusCss] = useState({
        home: "",
        users: "",
        calander: "",
        attandance: "",
    });

    const [userProfile, setuserProfile] = useState(JSON.parse(localStorage.getItem('storedData'))[2]);

    return (
        <>
            <div className="left">
                <ul id="leftNavIcon">

                    {/* <!--........................Home.............................--> */}
                    <li><i className={`fa fa-home ${focusCss.home}`} style={{ marginTop: "4.5rem", fontSize: "3rem" }} onClick={() => setfocusCss({ home: "focusNow" })}></i></li>

                    {/* <!--........................User.............................--> */}
                    <li className="attandance-dropdown d-flex">
                        <Link to="/users/users-list"><i className={`fas fa-user-friends ${focusCss.users}`} onClick={() => setfocusCss({ users: "focusNow" })}></i></Link>
                        <div className="attandance-dropdown-content drop-users mt-2 pl-2 pb-4" style={{ fontSize: "1.6rem", width: "21rem" }}>
                            <p>Users</p>

                            <div onClick={() => setfocusCss({ users: "focusNow" })}>
                                {/* ..................Users List.............. */}
                                {userProfile.userType === "E" &&
                                    (<Link to="/users/users-list">
                                        <div className="d-flex drop navlink active" onClick={(e) => setActiveClass(e)}>
                                            <i className="fas fa-user-friends ml-2 mr-3"></i>
                                            <p>Users</p>
                                        </div>
                                    </Link>)
                                }

                                {/* ..................Hierarchy................ */}
                                <Link to="/users/hierarchy">
                                    <div className="d-flex drop mt-1 navlink" onClick={(e) => setActiveClass(e)}>
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
                        <div className="attandance-dropdown-content drop-attadance mt-2 pl-2 pb-4" style={{ fontSize: "1.6rem", width: "24rem" }}>
                            <p>Attandance</p>

                            <div onClick={() => setfocusCss({ attandance: "focusNow" })}>
                                {/* ...........Take Attandance............ */}
                                {userProfile.userType === "E" &&
                                    <Link to="/attandance/take-attandance">
                                        <div className="d-flex drop pt-1 navlink" onClick={(e) => setActiveClass(e)}>
                                            <i className="fas fa-user-friends ml-2 mr-3"></i>
                                            <p>Take attandance</p>
                                        </div>
                                    </Link>
                                }

                                {/* ..............Leave Requests........................ */}
                                <Link to="/attandance/leave-request">
                                    <div className="d-flex drop mt-1 navlink" onClick={(e) => setActiveClass(e)}>
                                        <i className="fas fa-user-plus ml-2 mr-3"></i>
                                        <p>Leave request</p>
                                    </div>
                                </Link>

                                {/* ..............Attandance History........................ */}
                                {userProfile.userType === "E" &&
                                    <Link to="/attandance/history">
                                        <div className="d-flex drop mt-1 navlink" onClick={(e) => setActiveClass(e)}>
                                            <i className="fas fa-history ml-2 mr-3"></i>
                                            <p>Attandance History</p>
                                        </div>
                                    </Link>
                                }
                            </div>

                        </div>
                    </li>


                </ul>
            </div>
        </>
    )
}

export default LeftSideBar
