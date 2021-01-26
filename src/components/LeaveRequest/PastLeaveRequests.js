




import React, { useEffect, useState } from 'react';
import ApiCalls from '../ApiCalls';
import axios from '../axios';
import AppliedLeaveRequestCard from './AppliedLeaveRequestCard';
import EyeLeaveRequestModel from './EyeLeaveRequestModel';
import "./PastLeaveRequests.css";

function PastLeaveRequests(props) {

    const [clickEyeIcon, setclickEyeIcon] = useState(false);
    const [indexForEye, setindexForEye] = useState(0);


    const [pastLeaveRequestsData, setpastLeaveRequestsData] = useState([]);

    useEffect(() => {
        async function obtainPastLeaveRequestsData() {

            // ..................Past Leave Requests Api.....................................
            try {
                await axios.get(ApiCalls.leaveRequestsHistory)
                    .then(responce => {
                        console.log("pastLeaveRequestsData responce:", responce);
                        setpastLeaveRequestsData(responce.data._embedded.leaveResponseDTOList);
                    })
                    .catch(error => {
                        console.log("Something went wrong with pastLeaveRequestsData Api", error);
                    });
            }
            catch (error) {
                setpastLeaveRequestsData([]);
                console.log("Error catched while calling pastLeaveRequestsData Api", error);
            }

        }

        console.log("outside if of pastLeaveRequestsData: ", pastLeaveRequestsData);

        if (pastLeaveRequestsData.length === 0) {
            console.log("inside if of pastLeaveRequestsData: ", pastLeaveRequestsData);
            return obtainPastLeaveRequestsData();
        };

    }, []);


    const dateFormater = (rawDate) => {
        var oldDate = rawDate.slice(0, 2);

        var todaysDate = new Date();
        todaysDate = todaysDate.getDate();

        const showDate = todaysDate - oldDate

        return `${showDate} d`;
    }




    return (
        <>
            <div className="d-flex combine-past-applied">

                <div className="past-leave-requests mr-4 ml-4 mt-4">
                    <div className="d-flex mt-3">
                        <div className="heading-leave-request ml-5 pl-1">Leave requests</div>
                        <div className="pagination-text mr-4 mt-1 ml-auto">1 to 6 of 6</div>
                        <button className="pagination-button-leave-request bg-white ml-5"><i className="fa fa-chevron-left pagination-i"></i></button>
                        <button className="pagination-button-leave-request bg-white ml-1"><i className="fa fa-chevron-right pagination-i"></i></button>
                        {/* .......................Filter Icons.............................. */}
                        <i className="fas fa-filter mr-4 pr-4 pl-4" style={{ fontSize: "2.5rem" }}></i>
                    </div>
                    <hr style={{ width: "91%", marginTop: "1.0rem", borderTop: ".1rem solid rgb(239 244 247, 0.3)" }} />
                    {/* .......................Details heading.............................. */}
                    <div className="d-flex leave-request-left-card-heading justify-content-between col-11 mb-4">
                        <p className="added-name-past-requests">Name</p>
                        <p className="pt-2 pl-4 pr-1 pb-2">No. of Days</p>
                        <p className="pt-2 pr-2 pl-1 pb-2">Date applied on</p>
                        <p className="pt-2 pr-5  pl-1 mr-3 pb-2">Action</p>
                    </div>

                    {/* .......................Data Parsed.............................. */}
                    {pastLeaveRequestsData.map((data, index) => (
                        <div key={index} className="d-flex p-1 pl-2 leave-request-left-data justify-content-between mt-3" onClick={() => setindexForEye(index)}>

                            <div className="d-flex">
                                <img className='smallCard-Hierarchy-down-card-img mt-2' src="/images/No_Image.png" alt="Avatar" style={{ height: "3.0rem", width: "3.0rem" }} />
                                <span className="recieved-leaves-names pt-3 ml-3">{data.firstName} {data.lastName}</span>
                            </div>
                            <p className="ml-3 pt-3 pl-5">{dateFormater(data.appliedOn)}</p>
                            <p className="pl-5 pt-3">{(data.startDate.split(" ")[0]).replaceAll("-", ", ")}</p>
                            <div className="d-flex pt-3">
                                <p className="mr-4">{data.status}</p>
                                <i className="far fa-eye mr-2 pr-2" onClick={() => { setclickEyeIcon(true); setindexForEye(index) }}></i>
                            </div>

                        </div>

                    ))}

                    {/* .......................AppliedLeaves Model when clicked eye........................................ */}
                    <EyeLeaveRequestModel show={clickEyeIcon} hide={() => setclickEyeIcon(false)} data={pastLeaveRequestsData} index={indexForEye} />

                </div>

                <AppliedLeaveRequestCard data={pastLeaveRequestsData} index={indexForEye} header={true} button={false} />
            </div>
        </>
    )
}

export default PastLeaveRequests
