




import React, { useState, useEffect } from 'react';
import "./ListViewUser.css";
import enums from "./enums";
import AlertModel from './AlertModel';


function ListViewUser(props) {

    const [show, setshow] = useState(false);


    return (
        <> { props.paginationData.map((userdata, index) => (
            <div key={index} className="d-flex user-card ml-5 mr-5 mt-4 bg-white">

                    {/* ..........................Name.............................. */}
                    <div className="col-3">
                        <form className="form-user-list mr-auto">
                            <input type="checkbox" className="list-check-box mr-1" id="user-name" name="user-name" />
                            <img className='list-img-icon ml-1 mr-2' src="/images/pic_gautam.png" alt="Avatar" />
                            <label className='list-names pl-1'>{`${userdata.firstName} ${userdata.lastName}`}</label>
                        </form>
                    </div>

                    {/* ..........................Contact.............................. */}
                    <div className="col-3">
                        <div className="row pl-3 mt-1 pt-1"><i class="fa fa-envelope-o pt-2" aria-hidden="true"></i><i className="ml-3">{userdata.contact.email}</i></div>
                        <div className="row pl-3 pb-2"><i class="fa fa-phone py-2" aria-hidden="true"></i><i className="ml-3">{userdata.contact.phone}</i></div>
                    </div>

                    {/* ..........................User Type.............................. */}
                    <div className="col-2 justify-content-center">
                        <p className="mt-3 list-user-type pt-1 ml-4">{enums[`${userdata.userType}`]}</p>
                    </div>

                    {/* ..........................User Status.............................. */}
                    <label className="switch mt-4 pl-4 ml-5">
                        <input type="checkbox" name={userdata.id} onChange={() => setshow(true)} />
                        <span className="slider round"></span>
                    </label>
                    {/* <AlertModel show={show} hide={() => setshow(false)} /> */}

            </div>

        ))}

        { props.paginationData.length > 0 ? <div></div> : <div className="mt-5 pt-5 text-danger text-center" style={{ fontSize: "1.6rem", fontWeight: "500" }}>Sorry There is no data to Show</div> }

        </>
    );
}

export default ListViewUser
