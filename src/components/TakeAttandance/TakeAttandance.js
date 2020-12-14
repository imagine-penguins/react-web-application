





import React, { useEffect, useState } from 'react';
import "../ListViewUser.css";
import "./TakeAttandance.css";
import ApiCalls from "../ApiCalls";
import axios from '../axios';

function TakeAttandance() {

    // ...................................AttandanceApi Call.......................................................
    const [takeAttandanceListData, settakeAttandanceListData] = useState([]);

    useEffect(() => {

        async function takeAttandanceList() {
            try {
                console.log("url:", "attandance/takeattandance, ", ApiCalls.attendanceUsers);
                const res = await axios.get(ApiCalls.attendanceUsers)
                .then(responce => {
                    console.log("AttandanceUsers responce:", responce);
                    settakeAttandanceListData(responce.data._embedded.userAttendanceResponseDTOList);
                })
                .catch(error => {
                    console.log(error);
                    console.log("Something went wrong with AttandanceUsers Api");
                });
            }
            catch (error) {
                settakeAttandanceListData([]);
                console.log("Error catched while calling AttandanceUsers Api", error);
            }
        }

        console.log("takeAttandanceListData: ", takeAttandanceListData);
        
        if (takeAttandanceListData.length === 0) {
            console.log("inside if: ", takeAttandanceListData);
            return takeAttandanceList();
        };


    }, []);



    return (
        <>
            {/* ....................Item heading Details........................................... */}
            <div className="d-flex heading-list ml-5 mt-4 bg-white">
                <div className="col-4">
                    <form className="Form pt-2 ml-5">
                        <input type="checkbox" className="list-check-box pt-1 mr-2" />
                        <label className="heading-list-Users">Name</label>
                    </form>
                </div>
                <div className="col-4 pt-2">
                    <span className="heading-list-rollno">Roll No / Employee ID</span>
                </div>
                <div className="col-4 pt-2 ml-5">
                    <span className="heading-list-mark-attandance pl-5">Mark Attandance</span>
                </div>
            </div>

            {/* ....................Attandance List........................................... */}

            { takeAttandanceListData.map((data, index) => (
                <div key={index} className="d-flex user-attandance-card ml-5 pb-3 mt-4 bg-white">

                    {/* ..........................Name.............................. */}
                    <div className="col-4">
                        <form className="Form ml-4 user-attandance-form mt-2 pt-3 mr-auto">
                            <input type="checkbox" className="list-check-box mr-1" id="user-name" name="user-name" />
                            <img className='list-img-icon ml-1 mr-4' src="/images/pic_gautam.png" alt="Avatar" style={{ width: "3.8rem", height: "3.8rem" }} />
                            <label className='user-attandance-card-name'>{`${data.firstName} ${data.lastName}`}</label>
                        </form>
                    </div>

                    {/* ..........................Roll No........................................ */}
                    <div className="col-4">
                        <div className="pl-3 mt-1 pt-4 text-secondary"><i className="user-attandance-card-rollno ml-3">{data.userId}</i></div>
                    </div>

                    {/* ..........................Mark Attandance Status.............................. */}
                    <div className="col-4 pt-1">
                        <label className="switch mt-4 pl-4 ml-5">
                            <input type="checkbox"/>
                            <span className="slider round attandance-slider"></span>
                        </label>
                    </div>

                    {/* {data.status != "A" ? <div className="col-4  pt-1">
                        <label className="switch mt-4 pl-4 ml-5">
                            <input type="checkbox" />
                            <span className="slider attandance-slider round"></span>
                        </label>
                    </div> : <div className="col-4  pt-1">
                            <label className="switch mt-4 pl-4 ml-5">
                                <input type="checkbox" defaultChecked />
                                <span className="slider attandance-slider round"></span>
                            </label>
                        </div>
                    } */}

                </div>
                
            ))}

        </>
    )
}

export default TakeAttandance
