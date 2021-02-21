






import React, {useEffect, useState} from 'react';
import "./LeaveRequest.css";

import AppliedLeaves from './AppliedLeaves';
import LeaveRequestChart from './LeaveRequestChart';
import ApplyLeaveModal from './ApplyLeaveModal';
import RecievedLeave from './RecievedLeave';
import PastLeaveRequests from './PastLeaveRequests';
import ToShowTopPath from '../ToShowTopPath';


function LeaveRequest() {

    const [showApplyLeaveModal, setshowApplyLeaveModal] = useState(false);
    const [showRecievedLeave, setshowRecievedLeave] = useState(false);
    const [showAppliedLeave, setshowAppliedLeave] = useState(false);
    const [showPendingRequest, setshowPendingRequest] = useState(false);
    const [userProfile, setuserProfile] = useState(JSON.parse(localStorage.getItem('storedData'))[2]);

    const [triger, settriger] = useState(false);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('storedData'))[2].userType === 'E'){
            setshowRecievedLeave(true);
        }
        else{
            setshowAppliedLeave(true);
        }
    }, [])


    return (
        <>
            <ToShowTopPath path={`Attandance / Leave Request / ${showRecievedLeave ? (showPendingRequest ? `Recieved Leaves / Past Leave Requests` : `Recieved Leaves / Pending Requests`) : `Applied Leaves`}`} />
            
            {/* .......................Buttons on top............................................. */}
            <div className="d-flex leave-request ml-4 my-4">
                {(userProfile.userType === 'E') && <button className={`leave-request-button ${showRecievedLeave && `focusCss`}`} onClick={() => {setshowRecievedLeave(true); setshowAppliedLeave(false); setshowPendingRequest(false);}}>Recieved Leaves</button>}
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

                {(userProfile.userType === 'E') && showRecievedLeave && (showPendingRequest ? <PastLeaveRequests /> : <RecievedLeave triger={triger} />)}
                {showAppliedLeave && <><AppliedLeaves triger={triger} /> <LeaveRequestChart appliedLeaves={true} /></>}

            </div>

        </>
    )
}

export default LeaveRequest
