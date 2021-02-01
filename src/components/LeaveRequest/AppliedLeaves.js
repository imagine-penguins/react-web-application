




import React, {useEffect, useState } from 'react';
import EyeLeaveRequestModel from './EyeLeaveRequestModel';
import "./AppliedLeaves.css";
import dateDiff from '../DateDifference';
import axios from '../axios';
import ApiCalls from '../ApiCalls';

import {months} from "../enums";


function AppliedLeaves(props) {

    const [clickEyeIcon, setclickEyeIcon] = useState(false);
    const [indexForEye, setindexForEye] = useState(0);
    const [countPages, setcountPages] = useState(0);
    const [totalPages, settotalPages] = useState(0);
    const [pageSize, setpageSize] = useState(0);
    const [totalElements, settotalElements] = useState(0);

    const [appliedLeavesData, setappliedLeavesData] = useState([]);


    useEffect(() => {
        
        async function obtainApisData() {

            // ..................Applied leaves Api.....................................
            try {
                await axios.get(ApiCalls.leaveRequests)
                .then(responce => {
                    console.log("appliedLeavesData responce:", responce);
                    setappliedLeavesData(responce.data._embedded.leaveResponseDTOList);
                    settotalPages(responce.data.page.totalPages);
                    setpageSize(responce.data.page.size);
                    settotalElements(responce.data.page.totalElements);
                })
                .catch(error => {
                    setappliedLeavesData([]);
                    console.log("Something went wrong with appliedLeavesData Api", error);
                });
            }
            catch (error) {
                setappliedLeavesData([]);
                console.log("Error catched while calling appliedLeavesData Api", error);
            }
        }

        console.log("appliedLeavesData: ", appliedLeavesData);
        obtainApisData();

    }, [props.triger]);


    const paginationAppliedLeft = () => {
        let xCount = countPages - 1;
        console.log("clicked pagination and countPage, totalPages is : ", xCount, totalPages);
        if (xCount >= 0) {
            axios.get(ApiCalls.leaveRequests + `?size=10&page=${xCount}`)
            .then(responce => {
                console.log("response on leftPagination :", responce);
                setappliedLeavesData(responce.data._embedded.leaveResponseDTOList);
                setcountPages(xCount);
                settotalElements(responce.data.page.totalElements);
            })
            .catch(error => {
                setappliedLeavesData([]);
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
            axios.get(ApiCalls.leaveRequests + `?size=10&page=${xCount}`)
            .then(responce => {
                console.log("response on rightPagination :", responce);
                setappliedLeavesData(responce.data._embedded.leaveResponseDTOList);
                setcountPages(xCount);
                settotalElements(responce.data.page.totalElements);
            })
            .catch(error => {
                setappliedLeavesData([]);
                console.log("error occured in rightPagination :", error);
            });
        }
        else {
            console.log("countPages reaches limit :", countPages);
        }
    }


    return (
        <>

            <div className={`${props.showName ? `past-leave-requests mr-4` : `leave-attandance-left`} ml-4 mt-4`}>
                <div className="d-flex mt-3">

                    {/* ..................Heading........................ */}
                    <div className="heading-leave-request ml-4 pl-1">Leave requests</div>
                    <div className="pagination-text mr-4 mt-1 ml-auto">{countPages === 0 ? 1 : (countPages * pageSize) + 1} to {(countPages + 1) === totalPages ? totalElements : pageSize * (countPages + 1)} of {totalElements}</div>
                    
                    {/* ..................Pagination........................ */}
                    <button className="pagination-button-leave-request bg-white ml-5" onClick={paginationAppliedLeft}><span><i className="fa fa-chevron-left pagination-i"></i></span></button>
                    <button className="pagination-button-leave-request bg-white ml-1" onClick={paginationAppliedRight}><i className="fa fa-chevron-right pagination-i"></i></button>
                    
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
                {appliedLeavesData.map((data, index) => (
                    <div key={index} tabindex={index + 1} className="d-flex ml-5 leave-request-left-data justify-content-between mt-3 pt-3">
                        
                        {props.showName && <div className="d-flex"><img className='smallCard-Hierarchy-down-card-img mt-2' src="/images/No_Image.png" alt="Avatar" style={{ height: "3.0rem", width: "3.0rem" }} />
                        <span className="recieved-leaves-names pt-3 ml-3">{data.firstName} {data.lastName}</span></div>}
                        <p className="col-4 ml-3">{dateDiff(data.appliedOn)}</p>
                        <p className="col-4 pl-5">{data.appliedOn.split("-")[0]} {months[data.appliedOn.split("-")[1]]}, {(data.appliedOn.split("-")[2]).split(" ")[0]}</p>
                        <div className="col-4 ml-4 pl-5 d-flex">
                            <p className="mr-4">{data.status}</p>
                            <i className="far fa-eye pr-4" onClick={() => {setclickEyeIcon(true); setindexForEye(index)}}></i>
                        </div>

                    </div>

                ))}

                {/* .......................AppliedLeaves Model when clicked eye........................................ */}
                <EyeLeaveRequestModel show={clickEyeIcon} hide={() => setclickEyeIcon(false)} data={appliedLeavesData} index={indexForEye} />
                
            </div>
        
        </>
    )
}

export default AppliedLeaves
