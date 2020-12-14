






import React, {useEffect, useState} from 'react';
import "./LeaveRequest.css";

import AppliedLeaves from './AppliedLeaves';
import LeaveRequestChart from './LeaveRequestChart';
import ApplyLeaveModal from './ApplyLeaveModal';
import RecievedLeave from './RecievedLeave';
import PastLeaveRequests from './PastLeaveRequests';
import AppliedLeaveRequestCard from './AppliedLeaveRequestCard';
import axios from '../axios';
import ApiCalls from '../ApiCalls';

function LeaveRequest() {

    const [showApplyLeaveModal, setshowApplyLeaveModal] = useState(false);
    const [showRecievedLeave, setshowRecievedLeave] = useState(true);
    const [showAppliedLeave, setshowAppliedLeave] = useState(false);
    const [showPendingRequest, setshowPendingRequest] = useState(false);


    const [barGraphData, setbarGraphData] = useState([]);
    const [appliedLeavesData, setappliedLeavesData] = useState([]);

    useEffect(() => {
        
        async function obtainApisData() {

            // ..................Bar Graph Api.....................................
            try {
                await axios.get(ApiCalls.leaveRequestsGraph)
                .then(responce => {
                    console.log("barGraphData responce:", responce);
                    setbarGraphData(responce.data._embedded.graphDataList.concat({month: "", leaveCount: 0}, {month: "", leaveCount: 0}));
                })
                .catch(error => {
                    console.log("Something went wrong with LeaveRequestChart Api", error);
                });
            }
            catch (error) {
                setbarGraphData([]);
                console.log("Error catched while calling LeaveRequestChart Api", error);
            }

            // ..................Applied leaves Api.....................................
            try {
                await axios.get(ApiCalls.leaveRequests)
                .then(responce => {
                    console.log("appliedLeavesData responce:", responce);
                    setappliedLeavesData(responce.data._embedded.leaveResponseDTOList);
                })
                .catch(error => {
                    setappliedLeavesData([]);
                    console.log("Something went wrong with appliedLeavesData Api", error);
                });
            }
            catch (error) {
                setappliedLeavesData([]);
                console.log("when error appliedLeavesData: ", appliedLeavesData);
                console.log("Error catched while calling appliedLeavesData Api", error);
            }


        }


        console.log("appliedLeavesData: ", appliedLeavesData);
        console.log("barGraphData: ", barGraphData);
        
        if (appliedLeavesData.length === 0) {
            console.log("inside if of Applied Leaves: ", appliedLeavesData);
            return obtainApisData();
        };

        if (barGraphData.length === 0) {
            console.log("inside if of BarGraph: ", barGraphData);
            return obtainApisData();
        };

    }, []);




    return (
        <>
            {/* .......................Buttons on top............................................. */}
            <div className="d-flex leave-request ml-4 my-4">
                <button className="leave-request-button" onClick={() => {setshowRecievedLeave(true); setshowAppliedLeave(false); setshowPendingRequest(false);}}>Recieved Leaves</button>
                <button className="leave-request-button" onClick={() => {setshowAppliedLeave(true); setshowRecievedLeave(false); setshowPendingRequest(false);}}>Applied Leaves</button>
                <button className="leave-request-button ml-auto" onClick={() => setshowApplyLeaveModal(true)}>Apply Leave</button>
                <button className="leave-request-button mr-5">...</button>

                {/* .......................LeaveRequest Model when clicked eye......................................... */}
                <ApplyLeaveModal show={showApplyLeaveModal} hide={() => setshowApplyLeaveModal(false)} />
            
            </div>

            {/* ..............Show Browse.................... */}
            {showRecievedLeave && 
            <div className="d-flex browse-recieved-leaves mt-2 ml-4">
                <span className="browse-text pl-3">Browse</span>
                <span className="test-pending-request ml-3 pl-1 pr-1" onClick={() => setshowPendingRequest(!showPendingRequest)}>{showPendingRequest ? `Past Leave Requests` : `Pending Requests (45)`}</span>
                <span className="triangle-icon-at-bottom"></span>
            </div>}


            <div className="d-flex pr-5">

                {showAppliedLeave && <><AppliedLeaves showName={false} data={appliedLeavesData} /> <LeaveRequestChart chartData={barGraphData} /></>}
                {showRecievedLeave && (showPendingRequest ? <PastLeaveRequests /> : <RecievedLeave />)}

            </div>

        </>
    )
}

export default LeaveRequest
