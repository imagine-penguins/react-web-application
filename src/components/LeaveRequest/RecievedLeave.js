




import React, {useEffect, useState} from 'react';
import './RecievedLeave.css';

import AppliedLeaveRequestCard from './AppliedLeaveRequestCard';
import LeaveRequestChart from './LeaveRequestChart';
import axios from '../axios';
import ApiCalls from '../ApiCalls';
import dateDiff from '../DateDifference';
import setActiveClass from '../ActiveCss';


function RecievedLeave(props) {

    const [indexForEye, setindexForEye] = useState(0);
    const [disable, setdisable] = useState(false);
    const [pendingRequestData, setpendingRequestData] = useState([]);

    useEffect(() => {
        
        async function obtainPendingRequestData() {

            // ..................Pending Requests Api.....................................
            try {
                await axios.get(ApiCalls.leaveRequestsHistory + `?search=requestStatus:P&size=${10**6}&sort=updateDateTime,desc`)
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
        
        // console.log("pendingRequestData: ", pendingRequestData);
        obtainPendingRequestData();

    }, [disable, props.triger]);

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
                    <div className="recieved-leaves-data">
                        {/* ......................Name Arrey.................................... */}
                        {pendingRequestData.map((data, index) => (
                            <div key={index} className="d-flex recieved-leaves-all-names mt-1 p-2 navlink" onClick={(e) => {setindexForEye(index);setActiveClass(e);}}>
                                <span className="active-status"></span>
                                <img className='smallCard-Hierarchy-down-card-img' src={data.profilePic ? `${data.profilePic}` : `/images/No_Image.png`} alt="Avatar" style={{ height: "3.0rem", width: "3.0rem" }} />
                                <span className="recieved-leaves-names pt-2 ml-3">{data.firstName} {data.lastName}</span>
                                <span className="recieved-leaves-time pt-2 pl-3 ml-auto">{dateDiff(data.appliedOn)}</span>
                            </div>
                        ))}

                        {/* ......................If List is empty.............................. */}
                        {(pendingRequestData.length <= 0) && <><p className="empty-list mx-4 mt-5">There are no pending requests left.</p></>}
                    </div>

                </div>

                {/* ....................Recieved leave Right..................................... */}

                <div className="mt-3 combine-applied-chart">
                    <div className="ml-3">
                        <AppliedLeaveRequestCard data={pendingRequestData} index={indexForEye} header={true} button={true} disable={() => setdisable(!disable)} />
                    </div>
                    <div className="mr-1">
                        <LeaveRequestChart appliedLeaves={false} />
                    </div>
                </div>


            </div>

        </>
    )
}

export default RecievedLeave
