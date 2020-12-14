




import React, { useEffect, useState } from 'react';
import "./UserHierarchy.css";
import axios from "../axios";


function UserHierarchy(props) {

    // ...................................HierarchyApi Call.......................................................
    const [hierarchyData, sethierarchyData] = useState([]);

    // useEffect(() => {
    //     async function gethierarchyData() {
    //         try {
    //             const res = await axios.get("users/hierarchy").then(responce => {
    //                 console.log("Hierarchy-api responce:", responce);
    //                 sethierarchyData(responce.data);
    //             })
    //                 .catch(error => {
    //                     console.log(error);
    //                     console.log("Something went wrong with HierarchyData Api");
    //                 });
    //         }
    //         catch (error) {
    //             sethierarchyData([]);
    //             console.log("Error catched while calling herarchy Api", error);
    //         }
    //     }

    //     console.log("hierarchyData: ", hierarchyData);
    //     if (hierarchyData === []) {
    //         gethierarchyData();
    //     };


    // }, []);


    return (
            <>

            {/* .....................To show Path............................................................. */}
            <div className="d-flex text-secondary ml-4" style={{ fontSize: "1.3rem" }}>
                Users {`>`} Org hierarchy
            </div>

            {/* ....................If Data Comes up........................................................... */}
            { props.hierarchyData.firstName ? <>

            <div className="overlay">
                
                {/* ....................................Small Cards bellow.............................................. */}
                <div className="d-flex justify-content-center mt-4">

                    <div className="d-flex smallCard-Hierarchy-down mr-5" id="MainHierarchyCard">
                        <div className="col-3">
                            <img className='smallCard-Hierarchy-down-card-img' src="/images/pic_gautam.png" alt="Avatar" />
                        </div>
                        <div className="col-9">
                            <div className="d-flex">
                                <h5 className="smallCard-Hierarchy-down-card-name" style={{ marginBottom: ".3rem" }}>Mayank Kumar</h5>
                            </div>
                            <div className="d-flex">
                                <p className="smallCard-Hierarchy-down-card-text" style={{ fontWeight: "650" }}>Chemistery</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ....................................Big Card in middle.............................................. */}
                <div className="d-flex mt-4 pt-3 justify-content-center">
                    <div className="row">
                        <div className="org-hierarchy">
                            <div className="d-flex">
                                <div className="col-3">
                                    <img className='org-hierarchy-card-img' src="/images/pic_gautam.png" alt="Avatar" />
                                </div>
                                <div className="col-9 ml-1">
                                    <div className="d-flex">
                                        <h5 className="org-hierarchy-card-name">Gautam Kumar</h5>
                                    </div>
                                    <div className="d-flex">
                                        <i className="fas fa-briefcase text-secondary mt-1" aria-hidden="true"></i>
                                        <p className="org-hierarchy-card-text" style={{ fontSize: "1.5rem" }}>{props.hierarchyData.designation}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mt-3 ml-4 pl-2">
                                <i className="fa fa-envelope-o text-secondary mt-1" aria-hidden="true"></i>
                                <p className="org-hierarchy-card-text" style={{ marginBottom: "1.0rem" }}>{props.hierarchyData.email}</p>
                            </div>
                            <div className="d-flex ml-4 pl-2">
                                <i className="fa fa-phone text-secondary mt-1" aria-hidden="true"></i>
                                <p className="org-hierarchy-card-text">{props.hierarchyData.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ...................................Two Upper small Cards............................................... */}
                <div className="d-flex justify-content-center mt-4">
                    <div className="smallCard-Hierarchy d-flex">
                        <img className='smallCard-Hierarchy-card-img' src="/images/pic_gautam.png" alt="Avatar" />
                        <h5 className="smallCard-Hierarchy-card-name">Gautam Kumar</h5>
                    </div>
                </div>  
                
            </div>


            {/* ....................If there is no Data........................................................... */}
        </> : <div className="mt-5 pt-5 text-danger text-center" style={{ fontSize: "1.6rem", fontWeight: "500" }}>Sorry There is no data to Show</div>}

</>
    )
}

export default UserHierarchy
