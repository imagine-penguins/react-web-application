




import React, { useState } from 'react';
import "./AppliedLeaveRequestCard.css";

import {months} from "../enums";
import axios from '../axios';
import ApiCalls from '../ApiCalls';

function AppliedLeaveRequestCard(props) {

    if (props.data === undefined || props.data.length === 0) {
        return false
    }

    const data = props.data[props.index] ? props.data[props.index] : props.data[props.index ? (props.index - 1) : 0];
    // console.log("data at begning of AppliedLeaveRequestCard : ", props.data, data);

    const dateDiff = data.endDate.slice(0, 2) - data.startDate.slice(0, 2) + 1;

    const appliedOn = data.appliedOn.split(" ");
    var appliedDate = appliedOn[0].replaceAll("-", ",");
    var appliedTime = appliedOn[1];

    var am_pm = "am";

    if (parseInt(appliedTime.slice(0, 2)) > 12){
        am_pm = "pm";
    }


    var sDate = data.startDate.split("-");
    var eDate = data.endDate.split("-");
    sDate[1] = months[sDate[1]];
    eDate[1] = months[eDate[1]];

    const startDate = sDate[0] + " " + sDate[1] + ", " + sDate[2].split(" ")[0];
    const endDate = eDate[0] + " " + eDate[1] + ", " + eDate[2].split(" ")[0];

    // console.log("props.index : ", props.index);
    // console.log("startDate, endDate, appliedtime : ", startDate, ",", endDate, ",");

    const applyChanges = (e) => {
        e.preventDefault();

        const name = e.target.name;
        const id = e.target.getAttribute("data-id");
        const param = name === "accept" ? "/A" : "/R";
        // console.log("id, name, param :", id, name, param);

        if(param === "/A"){
            axios.put(ApiCalls.leaveRequests + `/${id}` + `/status` + param)
            .then(res => console.log("Successfully Submitted"))
            .catch(e => console.log("Error caught while accepting pending request", e));
        }
        else if(param === "/R"){
            axios.put(ApiCalls.leaveRequests + `/${id}` + `/status` + param + `?reason="not fisible"`)
            .then((res) => {
                console.log("Successfully Submitted", res);
            })
            .catch((e) => {
                console.log("Error caught while declining pending request", e);
            });
        }
        
        setTimeout(function() {
            alert(`Application has been ${name === "accept"? `Approved.` : `Rejected.`}`);
            props.disable();
        }, 1000);              //........Wait For 1sec...............
        
        // props.disable();
    }


    return (
        <>
            
            <div className={props.header ? `inside-eye-filter-with-header ml-2` : `inside-eye-filter ml-2` }>
                    
                { props.header ? 
                //.........If props.header......................
                <>
                <div className="d-flex mb-1">
                    <div className="col-7 pl-0 mr-auto">
                        <span className="heading-leave-request mt-2" style={{ fontSize: "1.79rem" }}>Leave Requests</span>
                        <hr style={{ marginLeft: "0rem", marginTop: "0rem", paddingTop: ".5rem", marginBottom: "0rem", borderTop: "0rem", borderBottom: ".1rem solid #e5e5e5" }} />
                    </div>
                    <p className="eye-filter-text mt-4" style={{ fontSize: "1.1rem" }}>{appliedDate} at {appliedTime} {am_pm}</p>
                </div>

 
                </>

                :

                //.........Else................................
                <p className="eye-filter-text" style={{ fontSize: "1.1rem" }}>{appliedDate} at {appliedTime} {am_pm}</p>

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
