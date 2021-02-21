




import React from 'react';
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {

    let history = useHistory();

    return (
        <>
            <div className="container-fluid top-sticky-bar">
                <div className="d-flex sticky-top bg-grey">
                    <Link to="/users" className="company-name text-dark ml-5" ><b style={{ fontSize: "2.5rem", marginBottom: "0rem" }}>Imagine Penguins</b></Link>

                    {/* <!--............Search Icon............--> */}
                    <div className="form-group has-search ml-auto  mt-2 mb-0">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" className="form-control top-nav-search" placeholder="Search" style={{ fontSize: "1.4rem", lineHeight: "0rem" }} />
                    </div>

                    {/* <!--............Add New button Icon............--> */}
                    {JSON.parse(localStorage.getItem('storedData'))[2].userType === 'E' && <button className="btn add-user-top btn-sm ml-5 mt-2"><b className="plus-button"> + </b> Add New </button>}

                    {/* <!--............Sign Out Icon............--> */}
                    <i className="fa fa-sign-out top-fa-icon ml-5" id="signOut"
                        onClick={() => {
                            localStorage.removeItem("storedData");
                            window.location.href = '/login';
                        }}></i>

                    {/* <!--............Notification Icon............--> */}
                    <i className="fa fa-bell top-fa-icon ml-4"></i>

                    {/* <!--............Chat Icon............--> */}
                    <i className='fa fa-comments top-fa-icon ml-4'></i>

                    {/* <!--............User Profile Icon............--> */}
                    <Link to="/profile"><img className='profile-img_icon ml-4' src={JSON.parse(localStorage.getItem('storedData'))[2].profilePic ? JSON.parse(localStorage.getItem('storedData'))[2].profilePic : "/images/pic_gautam.png"} alt="Avatar" /></Link>

                </div>
            </div>
        </>
    )
}

export default Navbar
