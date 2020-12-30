




import React, {useEffect, useState} from 'react';
import EyeLeaveRequestModel from './EyeLeaveRequestModel';
import "./AppliedLeaves.css";

import {months} from "../enums";


function AppliedLeaves(props) {


    const [clickEyeIcon, setclickEyeIcon] = useState(false);
    const [indexForEye, setindexForEye] = useState(0);


    const dateFormater = (rawDate) => {
        var oldDate = rawDate.slice(0, 2);

        var todaysDate = new Date();
        todaysDate = todaysDate.getDate();

        const showDate = todaysDate - oldDate

        return `${showDate} d`;
    }


    return (
        <>

            <div className={`${props.showName ? `past-leave-requests mr-4` : `leave-attandance-left`} ml-4 mt-4`}>
                <div className="d-flex mt-3">
                    <div className="heading-leave-request ml-4 pl-1">Leave requests</div>
                    <div className="pagination-text mr-4 mt-1 ml-auto">1 to 6 of 6</div>
                    <button className="pagination-button-leave-request bg-white ml-5"><i className="fa fa-chevron-left pagination-i"></i></button>
                    <button className="pagination-button-leave-request bg-white ml-1"><i className="fa fa-chevron-right pagination-i"></i></button>
                    {/* .......................Filter Icons.............................. */}
                    <i className="fas fa-filter mr-2 pr-5 pl-4" style={{ fontSize: "2.5rem" }}></i>
                </div>
                <hr style={{ width:"91%", marginTop:"1.0rem", borderTop: ".1rem solid rgb(239 244 247, 0.3)" }} />
                {/* .......................Details heading.............................. */}
                <div className="d-flex leave-request-left-card-heading justify-content-between col-11 mb-4">
                    {props.showName && <p className="added-name-past-requests">Name</p>}
                    <p className="pt-2 pl-4 pr-2 pb-2">No. of Days</p>
                    <p className="pt-2 pr-3 pb-2">Date applied on</p>
                    <p className="pt-2 pr-5 mr-4 pb-2">Action</p>
                </div>
                
                {/* .......................Data Parced.............................. */}
                {props.data.map((data, index) => (
                    <div key={index} className="d-flex ml-5 leave-request-left-data justify-content-between mt-3 pt-3">
                        
                        {props.showName && <div className="d-flex"><img className='smallCard-Hierarchy-down-card-img mt-2' src="/images/pic_gautam.png" alt="Avatar" style={{ height: "3.0rem", width: "3.0rem" }} />
                        <span className="recieved-leaves-names pt-3 ml-3">{data.firstName} {data.lastName}</span></div>}
                        <p className="ml-3 pl-5">{dateFormater(data.appliedOn)}</p>
                        <p className="pl-5">{data.startDate.split("-")[0]} {months[data.startDate.split("-")[1]]}, {(data.startDate.split("-")[2]).split(" ")[0]}</p>
                        <div className="d-flex">
                            <p className="mr-4">{data.status}</p>
                            <i className="far fa-eye pr-3" onClick={() => {setclickEyeIcon(true); setindexForEye(index)}}></i>
                        </div>

                    </div>

                ))}

                {/* .......................AppliedLeaves Model when clicked eye........................................ */}
                <EyeLeaveRequestModel show={clickEyeIcon} hide={() => setclickEyeIcon(false)} data={props.data} index={indexForEye} />
                
            </div>
        
        </>
    )
}

export default AppliedLeaves
