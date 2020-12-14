




import React, {useEffect, useState} from 'react';
import './RecievedLeave.css';

import AppliedLeaveRequestCard from './AppliedLeaveRequestCard';
import LeaveRequestChart from './LeaveRequestChart';
import axios from '../axios';
import ApiCalls from '../ApiCalls';


function RecievedLeave() {

    const [indexForEye, setindexForEye] = useState(0);
    const [disable, setdisable] = useState(false);

    const [pendingRequestData, setpendingRequestData] = useState([]);

    useEffect(() => {
        async function obtainPendingRequestData() {

            // ..................Pending Requests Api.....................................
            try {
                await axios.get(ApiCalls.leaveRequestsHistory + `?search=requestStatus:P`)
                .then(responce => {
                    console.log("pendingRequestData responce:", responce);
                    setpendingRequestData(responce.data._embedded.leaveResponseDTOList);
                })
                .catch(error => {
                    setpendingRequestData([]);
                    console.log("Something went wrong with pendingRequestData Api", error);
                });
            }
            catch (error) {
                setpendingRequestData([]);
                console.log("when error pendingRequestData: ", pendingRequestData);
                console.log("Error catched while calling pendingRequestData Api", error);
            }

        }

        console.log("pendingRequestData: ", pendingRequestData);

        if (pendingRequestData.length === 0) {
            console.log("inside if of Pending Requests: ", pendingRequestData);
            return obtainPendingRequestData();
        };

    }, []);


    const dateFormater = (rawDate) => {
        var oldDate = rawDate.slice(0, 2);

        var todaysDate = new Date();
        todaysDate = todaysDate.getDate();

        const showDate = todaysDate - oldDate

        return `${showDate} d`;
    }

    console.log("disabled in recieved :", disable);


    return (
        <>
            
            <div className="d-flex combine-recieved-applied-chart">


                {/* ....................Recieved leave left..................................... */}
                <div className="recieved-leaves">

                    <div className="d-flex">
                        <span className="heading-leave-request mt-2">Leave Requests</span>
                    </div>

                    <hr style={{ marginTop: ".6rem", borderTop: ".1rem solid rgb(239 244 247, 0.3)" }} />

                    {/* ......................Name Arrey.................................... */}
                    {pendingRequestData.map((data, index) => (
                        <div key={index} className="d-flex recieved-leaves-all-names p-2" onClick={() => setindexForEye(index)} {...disable ? `disabled` : ``}>
                            <span className="active-status"></span>
                            <img className='smallCard-Hierarchy-down-card-img' src="/images/pic_gautam.png" alt="Avatar" style={{ height: "3.0rem", width: "3.0rem" }} />
                            <span className="recieved-leaves-names pt-3 ml-3">{data.firstName} {data.lastName}</span>
                            <span className="recieved-leaves-time pt-3 pl-3 ml-auto">{dateFormater(data.appliedOn)}</span>
                        </div>
                    ))}

                </div>

                {/* ....................Recieved leave Right..................................... */}

                <div className="mt-3 combine-applied-chart">
                    <div className="ml-3">
                        <AppliedLeaveRequestCard data={pendingRequestData} index={indexForEye} header={true} button={true} disable={() => setdisable(true)} />
                    </div>
                    <div className="mr-1">
                        <LeaveRequestChart />
                    </div>
                </div>


            </div>

        </>
    )
}

export default RecievedLeave
