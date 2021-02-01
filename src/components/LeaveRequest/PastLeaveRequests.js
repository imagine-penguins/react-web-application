




import React, { useEffect, useState } from 'react';
import ApiCalls from '../ApiCalls';
import axios from '../axios';
import AppliedLeaveRequestCard from './AppliedLeaveRequestCard';
// import EyeLeaveRequestModel from './EyeLeaveRequestModel';
import "./PastLeaveRequests.css";
import dateDiff from '../DateDifference';
import {months} from "../enums";

function PastLeaveRequests(props) {

    // const [clickEyeIcon, setclickEyeIcon] = useState(false);
    const [indexForEye, setindexForEye] = useState(0);
    const [countPages, setcountPages] = useState(0);
    const [totalPages, settotalPages] = useState(0);
    const [pageSize, setpageSize] = useState(0);
    const [totalElements, settotalElements] = useState(0);

    const [pastLeaveRequestsData, setpastLeaveRequestsData] = useState([]);

    useEffect(() => {
        async function obtainPastLeaveRequestsData() {

            // ..................Past Leave Requests Api.....................................
            try {
                await axios.get(ApiCalls.leaveRequestsHistory)
                    .then(responce => {
                        console.log("pastLeaveRequestsData responce:", responce);
                        setpastLeaveRequestsData(responce.data._embedded.leaveResponseDTOList);
                        settotalPages(responce.data.page.totalPages);
                        setpageSize(responce.data.page.size);
                        settotalElements(responce.data.page.totalElements);
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
        obtainPastLeaveRequestsData();

    }, []);


    const paginationAppliedLeft = () => {
        let xCount = countPages - 1;
        console.log("clicked pagination and countPage, totalPages is : ", xCount, totalPages);
        if (xCount >= 0) {
            axios.get(ApiCalls.leaveRequestsHistory + `?size=10&page=${xCount}`)
            .then(responce => {
                console.log("response on leftPagination :", responce);
                setpastLeaveRequestsData(responce.data._embedded.leaveResponseDTOList);
                setcountPages(xCount);
                settotalElements(responce.data.page.totalElements);
            })
            .catch(error => {
                setpastLeaveRequestsData([]);
                console.log("error occured in leftPagination :", error);
            });
        }
        else {
            console.log("countPages reaches limit :", countPages);
        }
    }

    const paginationAppliedRight = () => {
        let xCount = countPages + 1;
        console.log("clicked handelPagintionRight and countPage, totalPages is : ", xCount, totalPages);

        if (xCount <= (totalPages - 1)) {
            axios.get(ApiCalls.leaveRequestsHistory + `?size=10&page=${xCount}`)
            .then(responce => {
                console.log("response on rightPagination :", responce);
                setpastLeaveRequestsData(responce.data._embedded.leaveResponseDTOList);
                setcountPages(xCount);
                settotalElements(responce.data.page.totalElements);
            })
            .catch(error => {
                setpastLeaveRequestsData([]);
                console.log("error occured in rightPagination :", error);
            });
        }
        else {
            console.log("countPages reaches limit :", countPages);
        }
    }


    return (
        <>
            <div className="d-flex combine-past-applied">

                <div className="past-leave-requests mr-4 ml-4 mt-4">
                    <div className="d-flex mt-3">
                        <div className="heading-leave-request ml-5 pl-1">Leave requests</div>
                        <div className="pagination-text mr-4 mt-1 ml-auto">{countPages === 0 ? 1 : (countPages * pageSize) + 1} to {(countPages + 1) === totalPages ? totalElements : pageSize * (countPages + 1)} of {totalElements}</div>
                        {/* .......................Paginations.............................. */}
                        <button className="pagination-button-leave-request bg-white ml-5" onClick={paginationAppliedLeft}><i className="fa fa-chevron-left pagination-i"></i></button>
                        <button className="pagination-button-leave-request bg-white ml-1" onClick={paginationAppliedRight}><i className="fa fa-chevron-right pagination-i"></i></button>
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
                        <div key={index} tabIndex={index} className="d-flex p-1 pl-2 leave-request-left-data justify-content-between mt-3" onClick={() => setindexForEye(index)}>

                            <div className="d-flex pl-0 col-4">
                                <img className='smallCard-Hierarchy-down-card-img mt-2' src="/images/No_Image.png" alt="Avatar" style={{ height: "3.0rem", width: "3.0rem" }} />
                                <span className="recieved-leaves-names pt-3 ml-3">{data.firstName} {data.lastName}</span>
                            </div>
                            <p className="col-3 pl-5 pt-3">{dateDiff(data.appliedOn)}</p>
                            <p className="col-3 pt-3">{data.appliedOn.split("-")[0]} {months[data.appliedOn.split("-")[1]]}, {(data.appliedOn.split("-")[2]).split(" ")[0]}</p>
                            <div className="d-flex col-2 pl-0 pt-3">
                                <p className="ml-4 pr-2">{data.status}</p>
                                {/* <i className="far fa-eye mr-2 pr-2" onClick={() => { setclickEyeIcon(true); setindexForEye(index) }}></i> */}
                            </div>

                        </div>

                    ))}

                    {/* .......................AppliedLeaves Model when clicked eye........................................ */}
                    {/* <EyeLeaveRequestModel show={clickEyeIcon} hide={() => setclickEyeIcon(false)} data={pastLeaveRequestsData} index={indexForEye} /> */}

                </div>

                <AppliedLeaveRequestCard data={pastLeaveRequestsData} index={indexForEye} header={true} button={false} />
            </div>
        </>
    )
}

export default PastLeaveRequests
