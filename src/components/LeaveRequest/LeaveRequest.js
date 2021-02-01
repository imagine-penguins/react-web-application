






import React, {useEffect, useState} from 'react';
import "./LeaveRequest.css";

import AppliedLeaves from './AppliedLeaves';
import LeaveRequestChart from './LeaveRequestChart';
import ApplyLeaveModal from './ApplyLeaveModal';
import RecievedLeave from './RecievedLeave';
import PastLeaveRequests from './PastLeaveRequests';
// import AppliedLeaveRequestCard from './AppliedLeaveRequestCard';
// import axios from '../axios';
// import ApiCalls from '../ApiCalls';

function LeaveRequest() {

    const [showApplyLeaveModal, setshowApplyLeaveModal] = useState(false);
    const [showRecievedLeave, setshowRecievedLeave] = useState(true);
    const [showAppliedLeave, setshowAppliedLeave] = useState(false);
    const [showPendingRequest, setshowPendingRequest] = useState(false);


    const [triger, settriger] = useState(false);


    return (
        <>
            {/* .......................Buttons on top............................................. */}
            <div className="d-flex leave-request ml-4 my-4">
                <button className={`leave-request-button ${showRecievedLeave && `focusCss`}`} onClick={() => {setshowRecievedLeave(true); setshowAppliedLeave(false); setshowPendingRequest(false);}}>Recieved Leaves</button>
                <button className={`leave-request-button ${showAppliedLeave && `focusCss`}`} onClick={() => {setshowAppliedLeave(true); setshowRecievedLeave(false); setshowPendingRequest(false);}}>Applied Leaves</button>
                <button className="leave-request-button ml-auto" onClick={() => setshowApplyLeaveModal(true)}>Apply Leave</button>
                <button className="leave-request-button mr-5">...</button>

                {/* .......................LeaveRequest Model when clicked eye......................................... */}
                <ApplyLeaveModal show={showApplyLeaveModal} hide={() => setshowApplyLeaveModal(false)} triger={() => settriger(!triger)} />
            
            </div>

            {/* ..............Show Browse.................... */}
            {showRecievedLeave && 
            <div className="d-flex browse-recieved-leaves mt-2 ml-4">
                <span className="browse-text pl-3 mr-3">Browse</span>
                <div className="dropdown">
                    <button className="btn btn-lg btn-outline-none p-0 align-top dropdown-toggle" type="button" id="dropdownMenuButtonLeaveRequest" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {showPendingRequest ? `Past Leave Requests` : `Pending Requests (45)`}
                    </button>
                    <div className="dropdown-menu filter-dropdown3" aria-labelledby="dropdownMenuButton">
                        <label className="dropdown-item" onClick={() => setshowPendingRequest(true)} aria-disabled><p>Past Leave Requests</p></label>
                        <label className="dropdown-item" onClick={() => setshowPendingRequest(false)} aria-disabled><p>Pending Requests</p></label>
                    </div>
                </div>
            </div>}


            <div className="d-flex pr-5">

                {showAppliedLeave && <><AppliedLeaves showName={false} triger={triger} /> <LeaveRequestChart appliedLeaves={true} /></>}
                {showRecievedLeave && (showPendingRequest ? <PastLeaveRequests /> : <RecievedLeave triger={triger} />)}

            </div>

        </>
    )
}

export default LeaveRequest
