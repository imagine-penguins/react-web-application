




import React, { useState } from 'react';
import "./AppliedLeaveRequestCard.css";

import {months} from "../enums";
import axios from '../axios';
import ApiCalls from '../ApiCalls';

function AppliedLeaveRequestCard(props) {

    const [disable, setdisable] = useState(false);

    if (props.data === undefined || props.data.length === 0) {
        return false
    }

    const data = props.data[props.index];

    const dateDiff = data.endDate.slice(0, 2) - data.startDate.slice(0, 2);

    var sDate = data.startDate.split("-");
    var eDate = data.endDate.split("-");
    sDate[1] = months[sDate[1]];
    eDate[1] = months[eDate[1]];

    const appliedtime = sDate[2].split(" ")[1];

    const startDate = sDate[0] + " " + sDate[1] + ", " + sDate[2].split(" ")[0];
    const endDate = eDate[0] + " " + eDate[1] + ", " + eDate[2].split(" ")[0];

    console.log("props.index : ", props.index);
    console.log("startDate, endDate, appliedtime : ", startDate, ",", endDate, ",", appliedtime);

    const applyChanges = (e) => {
        e.preventDefault();
        console.log("data-id :", e.target.getAttribute("data-id"));

        const name = e.target.name;
        const param = name === "accept" ? "/A" : "/R";
        console.log("name, param :", name, param);

        axios.put(ApiCalls.leaveRequests + `/${e.target.name}` + `/status` + param);
        props.disable();
        setdisable(true);
        alert(`Application has been ${name === "accept"? `Approved.` : `Rejected.`}`);
    }

    console.log("disabled in recieved :", disable);


    return (
        <>
            
            <div className={props.header ? `inside-eye-filter-with-header ml-2` : `inside-eye-filter ml-2` } {...disable ? `disabled` : ``}>
                    
                { props.header ? 
                //.........If props.header......................
                <>
                <div className="d-flex mb-1">
                    <div className="col-7 pl-0 mr-auto">
                        <span className="heading-leave-request mt-2" style={{ fontSize: "1.79rem" }}>Leave Requests</span>
                        <hr style={{ marginLeft: "0rem", marginTop: "0rem", paddingTop: ".5rem", marginBottom: "0rem", borderTop: "0rem", borderBottom: ".1rem solid #e5e5e5" }} />
                    </div>
                    <p className="eye-filter-text mt-4" style={{ fontSize: "1.1rem" }}>{startDate} at {appliedtime} am</p>
                </div>

 
                </>

                :

                //.........Else................................
                <p className="eye-filter-text" style={{ fontSize: "1.1rem" }}>{startDate} at {appliedtime} am</p>

                }

                <div className="d-flex">
                    <span className="eye-filter-name">{data.firstName} {data.lastName}</span>
                    <p className="eye-filter-text pl-3 mt-1 pt-1" style={{ fontWeight: "700" }}>has applied for : {data.leaveType}</p>
                </div>
                <p className="eye-filter-text">{startDate} &nbsp; to &nbsp;  {endDate} ({dateDiff} days)</p>
                
                <span className="d-flex area-for-text">
                    {data.leaveReason}
                </span>

                {props.button && <span className="d-flex eye-filter-button-bottom mt-3 pt-3">
                    <button className="eye-filter-decline-button mr-3" name="decline" data-id={data.id} onClick={applyChanges}>Decline</button>
                    <button className="eye-filter-approve-button mr-5" name="accept" data-id={data.id} onClick={applyChanges}>Accept</button>
                </span> }

            </div>

        </>
    )
}

export default AppliedLeaveRequestCard
