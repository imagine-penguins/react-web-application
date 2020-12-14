




import React from 'react';
import "./UserProfileLeft.css";

function UserProfileLeft() {
    return (
        <>
            < div className="User-Profile ml-4 bg-white mt-2" >
                <div className="d-flex justify-content-center pt-4"><img className='User-Profile-img' src="/images/pic_gautam.png" alt="Avatar" /></div>
                <div className="d-flex justify-content-center p-1"><h5 className="User-Profile-name">Gautam Kumar</h5></div>
                <div className="d-flex justify-content-center p-1"><p className="User-Profile-text" style={{ fontSize: "1.4rem", marginBottom: ".0rem" }}>Student</p></div>
                <div className="d-flex justify-content-center p-1"><button className="User-Profile-button"><i className="fas fa-comments User-Profile-chat-icon mt-1 mr-3" aria-hidden="true"></i>Chat</button></div>

                {/* ......................Contact details.......................... */}
                <div className="d-flex justify-content-left ml-4 mt-4 pt-2"><p className="User-Profile-text" style={{ fontSize: "1.7rem", color: "black" }}>Contact Details</p></div>
                <div className="d-flex justify-content-left pl-3">
                    <i className="fa fa-envelope-o text-secondary mt-2" style={{ fontSize: "1.8rem" }} aria-hidden="true"></i>
                    <p className="User-Profile-text pt-1 ml-3" style={{ fontSize: "1.25rem", overflow: "hidden", textOverflow: "ellipsis" }}>jangragautam98@gmail.com</p>
                </div>
                <div className="d-flex justify-content-left pl-3">
                    <i className="fa fa-phone text-secondary pt-3" style={{ fontSize: "1.8rem" }} aria-hidden="true"></i>
                    <p className="User-Profile-text pt-2 ml-3" style={{ fontSize: "1.4rem" }}>8888888888</p>
                </div>

                {/* ......................Reporting Manager.......................... */}
                <div className="d-flex justify-content-left ml-4 mt-4 pt-3"><p className="User-Profile-text" style={{ fontSize: "1.7rem", color: "black" }}>Reporting Manager</p></div>

                {/* .................Card at bottom................................... */}
                <div className="d-flex justify-content-center User-Profile-end mt-2">
                    <div className="d-flex smallCard-User-Profile">
                        <img className='smallCard-Hierarchy-down-card-img' src="/images/pic_gautam.png" alt="Avatar" />

                        <div className="">
                            <div className="d-flex">
                                <h5 className="smallCard-Hierarchy-down-card-name" style={{fontSize: "1.5rem", marginBottom: ".3rem" }}>Gautam Kumar</h5>
                            </div>
                            <div className="d-flex">
                                <p className="smallCard-Hierarchy-down-card-text" style={{ fontSize: "1.1rem", fontWeight: "650" }}>Student</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default UserProfileLeft
