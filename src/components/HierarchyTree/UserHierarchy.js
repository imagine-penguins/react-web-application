




import React, { useEffect, useState, useRef } from 'react';
import "./UserHierarchy.css";
import axios from "../axios";
import ApiCalls from '../ApiCalls';


function UserHierarchy(props) {

    // ...................................HierarchyApi Call...............................................
    const [hierarchyData, sethierarchyData] = useState([]);
    const [pastHierarchyList, setpastHierarchyList] = useState([]);
    const myRef = useRef();


    useEffect(() => {
        async function gethierarchyData() {
            const res = await axios.get(ApiCalls.usersProfile)
                .then((responce) => {
                    console.log("Hierarchy-api responce:", responce);
                    sethierarchyData(responce.data);
                })
                .catch(error => {
                    console.log("error in userData api call :", error);
                    sethierarchyData([]);
                });
        }

        console.log("hierarchyData: ", hierarchyData);
        gethierarchyData();

    }, []);


    const callHierarchy = (data) => {
        let id = data.generalInformation.reportingManagerId;
        // console.log("id in hierarchy is :", id);

        axios.get(ApiCalls.usersProfile + `/${id}`)
            .then((res) => {
                console.log("responce form hierarchy :", res);
                let prevList = pastHierarchyList;
                prevList.push(data);
                // console.log("prevList, newList to show above in hierarchy :", prevList);

                sethierarchyData(res.data);
            })
            .catch(e => console.log("error catched error in hierarchy :", e));

        let elem = myRef.current;
        // console.log("myRef.current :", elem);
        elem && elem.scrollIntoView({ behavior: "smooth" });
    }

    const callPreviousHierarchy = (index) => {
        let prevList = pastHierarchyList;
        let newList = index === 0 ? [] : prevList.slice(0, index);

        // console.log("newList callPreviousHierarchy:", newList);

        sethierarchyData(pastHierarchyList[index]);
        setpastHierarchyList(newList);

        let elem = myRef.current;
        // console.log("myRef.current :", elem);
        elem && elem.scrollIntoView({ behavior: "smooth" });
    }



    return (
        <>
            {/* ....................If Data Comes up........................................................... */}
            { hierarchyData.generalInformation ? <>

                <div className="overlay">

                    {/* ...................................Two Upper small Cards............................................... */}
                    {pastHierarchyList.map((data, index) => (
                        <div className="d-flex justify-content-center mt-4" onClick={() => callPreviousHierarchy(index)}>
                            <div className="smallCard-Hierarchy d-flex">
                                <img className='smallCard-Hierarchy-card-img' src={data.profilePic ? `${data.profilePic}` : `/images/No_Image.png`} alt="Avatar" />
                                <h5 className="smallCard-Hierarchy-card-name">{data.generalInformation.firstName}  {data.generalInformation.middleName} {data.generalInformation.lastName}</h5>
                            </div>
                        </div>
                    ))}


                    {/* ....................................Big Card in middle.............................................. */}
                    {hierarchyData.generalInformation && (
                        <div className="d-flex mt-4 pt-3 justify-content-center">
                            <div className="row">
                                <div className="org-hierarchy">
                                    <div className="d-flex">
                                        <div className="col-3">
                                            <img className='org-hierarchy-card-img' src={hierarchyData.profilePic ? `${hierarchyData.profilePic}` : `/images/No_Image.png`} alt="Avatar" />
                                        </div>
                                        <div className="col-9 ml-3">
                                            <div className="d-flex">
                                                <h5 className="org-hierarchy-card-name">{hierarchyData.generalInformation.firstName}  {hierarchyData.generalInformation.middleName} {hierarchyData.generalInformation.lastName}</h5>
                                            </div>
                                            <div className="d-flex">
                                                <i className="fas fa-briefcase text-secondary mt-1" aria-hidden="true"></i>
                                                <p className="org-hierarchy-card-text">{hierarchyData.generalInformation.designation ? hierarchyData.generalInformation.designation : "---"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mt-4 ml-5 pl-2">
                                        <i className="fa fa-envelope-o text-secondary mt-1" aria-hidden="true"></i>
                                        <p className="org-hierarchy-card-lower-text">{hierarchyData.generalInformation.contactDTO.email}</p>
                                    </div>
                                    <div className="d-flex ml-5 pl-2">
                                        <i className="fa fa-phone text-secondary mt-1" aria-hidden="true"></i>
                                        <p className="org-hierarchy-card-lower-text">{hierarchyData.generalInformation.contactDTO.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }

                    {/* ....................................Small Cards bellow.............................................. */}
                    {hierarchyData.generalInformation.reportingManagerName && (
                        <div className="d-flex justify-content-center mt-4 pt-3">
                            <div className="d-flex smallCard-Hierarchy-down" id="MainHierarchyCard" onClick={() => callHierarchy(hierarchyData)}>
                                <div className="col-3">
                                    <img className='smallCard-Hierarchy-down-card-img' src={hierarchyData.generalInformation.reportingManagerProfilePic ? `${hierarchyData.generalInformation.reportingManagerProfilePic}` : `/images/No_Image.png`} alt="Avatar" />
                                </div>
                                <div className="col-9">
                                    <div className="d-flex">
                                        <h5 className="smallCard-Hierarchy-down-card-name">{hierarchyData.generalInformation.reportingManagerName}</h5>
                                    </div>
                                    <div className="d-flex">
                                        <p className="smallCard-Hierarchy-down-card-text">{hierarchyData.generalInformation.reportingManagerDesignation ? hierarchyData.generalInformation.reportingManagerDesignation : "---"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }

                    {/* ..........To make it focus on every click.............. */}
                    <div style={{ height: "5rem" }} ref={myRef}></div>

                </div>


                {/* ....................If there is no Data........................................................... */}
            </> : <div className="mt-5 pt-5 text-danger text-center" style={{ fontSize: "1.6rem", fontWeight: "500" }}>Sorry There is no data to Show</div>}

        </>
    )
}

export default UserHierarchy
